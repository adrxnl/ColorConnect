// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBp2YridCWSaVd66UUbRkkRbAscINS7HjU",
  authDomain: "colorconnect-f850c.firebaseapp.com",
  projectId: "colorconnect-f850c",
  storageBucket: "colorconnect-f850c.appspot.com",
  messagingSenderId: "937372901345",
  appId: "1:937372901345:web:e57c1c80094871b2923ca0",
  databaseURL: "https://colorconnect-f850c-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// PhotoManager class
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

        this.filteredContext = this.filteredCanvas.getContext('2d');

        this.stream = null;
        this.originalImageData = null;
        this.currentColorBlindnessType = 'none';

        this.startCamera = this.startCamera.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.retakePhoto = this.retakePhoto.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this.applyColorBlindnessFilter = this.applyColorBlindnessFilter.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

        this.initEventListeners();
        this.loadFilterFromDatabase();
    }

    initEventListeners() {
        this.startButton.addEventListener('click', this.startCamera);
        this.uploadButton.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', this.handleFileUpload);
        this.takePhotoButton.addEventListener('click', this.takePhoto);
        this.retakeButton.addEventListener('click', this.retakePhoto);
        this.saveButton.addEventListener('click', this.savePhoto);

        this.filterTypeSelect.addEventListener('change', (e) => {
            this.currentColorBlindnessType = e.target.value;
            if (this.originalImageData) {
                this.applyFilterToImage();
            }
        });

        window.addEventListener('beforeunload', () => {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
        });
    }

    async loadFilterFromDatabase() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const typeRef = ref(db, `users/${user.uid}/colorblindnessType`);
                try {
                    const snapshot = await get(typeRef);
                    if (snapshot.exists()) {
                        this.currentColorBlindnessType = snapshot.val();
                        this.statusMessage.textContent = `Loaded filter: ${this.currentColorBlindnessType}`;
                    } else {
                        this.currentColorBlindnessType = 'none';
                        this.statusMessage.textContent = "No filter found. Defaulting to 'none'.";
                    }
                } catch (err) {
                    console.error("Failed to fetch colorblindnessType:", err);
                    this.statusMessage.textContent = "Error loading filter. Defaulting to 'none'.";
                }
            } else {
                this.statusMessage.textContent = "Not logged in. Using default filter.";
            }
            this.filterTypeSelect.value = this.currentColorBlindnessType;
        });
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: 'environment'
                },
                audio: false
            });

            this.videoElement.srcObject = this.stream;
            this.videoElement.play();

            await new Promise((resolve) => this.videoElement.onloadedmetadata = resolve);

            this.statusMessage.textContent = "Camera connected.";
            this.takePhotoButton.disabled = false;
            this.startButton.disabled = true;

            this.filteredCanvas.width = this.videoElement.videoWidth;
            this.filteredCanvas.height = this.videoElement.videoHeight;

        } catch (error) {
            console.error("Camera access error:", error);
            this.statusMessage.textContent = `Camera error: ${error.message}`;
        }
    }

    takePhoto() {
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = this.videoElement.videoWidth;
        tempCanvas.height = this.videoElement.videoHeight;
        tempContext.drawImage(this.videoElement, 0, 0, tempCanvas.width, tempCanvas.height);

        this.originalImageData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        this.applyFilterToImage();

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
                    this.filteredContext.drawImage(img, 0, 0);
                    this.originalImageData = this.filteredContext.getImageData(0, 0, img.width, img.height);
                    this.applyFilterToImage();

                    this.videoElement.style.display = 'none';
                    this.photoElement.style.display = 'block';
                    this.photoElement.src = this.filteredCanvas.toDataURL('image/png');

                    this.takePhotoButton.disabled = true;
                    this.retakeButton.disabled = false;
                    this.saveButton.disabled = false;
                    this.statusMessage.textContent = "Photo uploaded.";
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    applyFilterToImage() {
        this.filteredContext.putImageData(this.originalImageData, 0, 0);
        if (this.currentColorBlindnessType !== 'none') {
            const filtered = this.applyColorBlindnessFilter(
                this.filteredContext.getImageData(0, 0, this.filteredCanvas.width, this.filteredCanvas.height),
                this.currentColorBlindnessType
            );
            this.filteredContext.putImageData(filtered, 0, 0);
        }
        this.photoElement.src = this.filteredCanvas.toDataURL('image/png');
    }

    applyColorBlindnessFilter(imageData, type) {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            let newR, newG, newB;

            switch (type) {
                case 'protanopia':
                    newR = r * 0.567 + g * 0.433;
                    newG = r * 0.558 + g * 0.442;
                    newB = b * 0.8;
                    break;
                case 'deuteranopia':
                    newR = r * 0.625 + g * 0.375;
                    newG = r * 0.7 + g * 0.3;
                    newB = b * 0.8;
                    break;
                case 'tritanopia':
                    newR = r * 0.95 + g * 0.05;
                    newG = r * 0.433 + g * 0.567;
                    newB = b * 0.8;
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
        this.statusMessage.textContent = "Ready to take a new photo.";
    }

    savePhoto() {
        if (!this.filteredCanvas) {
            this.statusMessage.textContent = "No photo to save.";
            return;
        }

        this.filteredCanvas.toBlob((blob) => {
            let gallery = JSON.parse(localStorage.getItem('colorConnectGallery') || '[]');
            const imageId = `photo_${Date.now()}`;
            const reader = new FileReader();

            reader.onloadend = () => {
                const photoObject = {
                    id: imageId,
                    dataUrl: reader.result,
                    type: this.currentColorBlindnessType,
                    timestamp: new Date().toISOString()
                };

                gallery.push(photoObject);
                localStorage.setItem('colorConnectGallery', JSON.stringify(gallery));

                this.statusMessage.textContent = "Photo saved to gallery.";
            };
            reader.readAsDataURL(blob);
        }, 'image/png');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        new PhotoManager();
    } catch (err) {
        console.error("Error:", err);
        const statusMessage = document.getElementById('status-message');
        if (statusMessage) {
            statusMessage.textContent = `Initialization error: ${err.message}`;
        }
    }
});

// Make toggleSidebar globally accessible
window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
  };