class PhotoManager {
    constructor() {
        // UI Elements
        this.startButton = document.getElementById('start-camera');
        this.uploadButton = document.getElementById('upload-photo');
        this.fileInput = document.getElementById('file-input');
        this.takePhotoButton = document.getElementById('take-photo');
        this.retakeButton = document.getElementById('retake-photo');
        this.saveButton = document.getElementById('save-photo');
        this.videoElement = document.getElementById('video-feed');
        this.photoElement = document.getElementById('captured-photo');
        this.filteredCanvas = document.getElementById('filtered-canvas');
        this.statusMessage = document.getElementById('status-message');
        this.filterTypeSelect = document.getElementById('filter-type');

        // Canvas contexts
        this.filteredContext = this.filteredCanvas.getContext('2d');

        // State variables
        this.stream = null;
        this.originalImageData = null;
        this.currentColorBlindnessType = 'none';

        // Bind methods to ensure correct context
        this.startCamera = this.startCamera.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.retakePhoto = this.retakePhoto.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this.applyColorBlindnessFilter = this.applyColorBlindnessFilter.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

        // Initialize event listeners
        this.initEventListeners();

        // Get color blindness type from local storage
        this.currentColorBlindnessType = localStorage.getItem('colorBlindnessType') || 'none';
        this.filterTypeSelect.value = this.currentColorBlindnessType;
    }

    initEventListeners() {
        this.startButton.addEventListener('click', this.startCamera);
        this.uploadButton.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', this.handleFileUpload);
        this.takePhotoButton.addEventListener('click', this.takePhoto);
        this.retakeButton.addEventListener('click', this.retakePhoto);
        this.saveButton.addEventListener('click', this.savePhoto);
        
        // Update filter type selection
        this.filterTypeSelect.addEventListener('change', (e) => {
            this.currentColorBlindnessType = e.target.value;
            // If a photo is already captured, reapply the filter
            if (this.originalImageData) {
                this.applyFilterToImage();
            }
        });
        
        // Stop camera tracks if page is closed
        window.addEventListener('beforeunload', () => {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
        });
    }

    async startCamera() {
        try {
            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: 'environment'
                },
                audio: false
            });

            // Set video source and play
            this.videoElement.srcObject = this.stream;
            this.videoElement.play();

            // Wait for metadata to load
            await new Promise((resolve) => {
                this.videoElement.onloadedmetadata = resolve;
            });

            // Update UI
            this.statusMessage.textContent = "Camera connected. Ready to take photo.";
            this.takePhotoButton.disabled = false;
            this.startButton.disabled = true;

            // Set canvas dimensions
            this.filteredCanvas.width = this.videoElement.videoWidth;
            this.filteredCanvas.height = this.videoElement.videoHeight;

        } catch (error) {
            console.error("Camera access error:", error);
            this.statusMessage.textContent = `Camera access denied: ${error.message}`;
        }
    }

    takePhoto() {
        // Create a temporary canvas to capture the original image
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        
        // Set canvas dimensions to match video
        tempCanvas.width = this.videoElement.videoWidth;
        tempCanvas.height = this.videoElement.videoHeight;
        
        // Capture photo
        tempContext.drawImage(this.videoElement, 0, 0, tempCanvas.width, tempCanvas.height);
        
        // Store original image data
        this.originalImageData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Apply initial filter based on current selection
        this.applyFilterToImage();
        
        // Update UI
        this.videoElement.style.display = 'none';
        this.photoElement.style.display = 'block';
        this.photoElement.src = this.filteredCanvas.toDataURL('image/png');
        
        this.takePhotoButton.disabled = true;
        this.retakeButton.disabled = false;
        this.saveButton.disabled = false;
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.filteredCanvas.width = img.width;
                    this.filteredCanvas.height = img.height;
                    
                    this.filteredContext.drawImage(img, 0, 0, img.width, img.height);

                    this.originalImageData = this.filteredContext.getImageData(0, 0, img.width, img.height);

                    this.applyFilterToImage();

                    this.videoElement.style.display = 'none';
                    this.photoElement.style.display = 'block';
                    this.photoElement.src = this.filteredCanvas.toDataURL('image/png');

                    this.takePhotoButton.disabled = true;
                    this.retakeButton.disabled = false;
                    this.saveButton.disabled = false;

                    this.statusMessage.textContent = "Photo uploaded and filtered!";
                };
                img.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    applyFilterToImage() {
        // Reset canvas
        this.filteredContext.putImageData(this.originalImageData, 0, 0);
        
        // Apply filter if not 'none'
        if (this.currentColorBlindnessType !== 'none') {
            const filteredImageData = this.applyColorBlindnessFilter(
                this.filteredContext.getImageData(0, 0, this.filteredCanvas.width, this.filteredCanvas.height), 
                this.currentColorBlindnessType
            );
            this.filteredContext.putImageData(filteredImageData, 0, 0);
        }
        
        // Update photo display
        this.photoElement.src = this.filteredCanvas.toDataURL('image/png');
    }

    applyColorBlindnessFilter(imageData, type) {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            let newR, newG, newB;

            switch (type) {
                case 'protanopia':
                    newR = (r * 0.567) + (g * 0.433);
                    newG = (r * 0.558) + (g * 0.442);
                    newB = (b * 0.8);
                    break;
                case 'deuteranopia':
                    newR = (r * 0.625) + (g * 0.375);
                    newG = (r * 0.7) + (g * 0.3);
                    newB = (b * 0.8);
                    break;
                case 'tritanopia':
                    newR = (r * 0.95) + (g * 0.05);
                    newG = (r * 0.433) + (g * 0.567);
                    newB = (b * 0.8);
                    break;
                default:
                    return imageData;
            }

            data[i] = Math.min(255, Math.max(0, newR));
            data[i + 1] = Math.min(255, Math.max(0, newG));
            data[i + 2] = Math.min(255, Math.max(0, newB));
        }

        return imageData;
    }

    retakePhoto() {
        this.videoElement.style.display = 'block';
        this.photoElement.style.display = 'none';
        
        this.takePhotoButton.disabled = false;
        this.retakeButton.disabled = true;
        this.saveButton.disabled = true;
        
        this.originalImageData = null;
        this.statusMessage.textContent = "Camera is active. Ready to take a new photo.";
    }

    savePhoto() {
        if (!this.filteredCanvas) {
            this.statusMessage.textContent = "No photo to save.";
            return;
        }
    
        // Convert canvas to blob
        this.filteredCanvas.toBlob((blob) => {
            // Read existing gallery items or initialize empty array
            let gallery = JSON.parse(localStorage.getItem('colorConnectGallery') || '[]');
    
            // Create a unique identifier for the image
            const imageId = `photo_${Date.now()}`;
    
            // Read the image as base64
            const reader = new FileReader();
            reader.onloadend = () => {
                // Create photo object with metadata
                const photoObject = {
                    id: imageId,
                    dataUrl: reader.result,
                    type: this.currentColorBlindnessType,
                    timestamp: new Date().toISOString()
                };
    
                // Add to gallery
                gallery.push(photoObject);
    
                // Save updated gallery
                localStorage.setItem('colorConnectGallery', JSON.stringify(gallery));
    
                // Update status
                this.statusMessage.textContent = "Photo saved to gallery successfully!";
            };
            reader.readAsDataURL(blob);
        }, 'image/png');
    }
}

// Initialize the photo manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        const photoManager = new PhotoManager();
    } catch (error) {
        console.error("Error initializing PhotoManager:", error);
        const statusMessage = document.getElementById('status-message');
        if (statusMessage) {
            statusMessage.textContent = `Error initializing camera: ${error.message}`;
        }
    }
});