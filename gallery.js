document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const clearGalleryButton = document.getElementById('clear-gallery');

    // Function to render gallery
    function renderGallery() {
        // Clear existing gallery
        galleryContainer.innerHTML = '';

        // Retrieve gallery from local storage
        const gallery = JSON.parse(localStorage.getItem('colorConnectGallery') || '[]');

        if (gallery.length === 0) {
            galleryContainer.innerHTML = '<p>No photos in gallery yet.</p>';
            return;
        }

        // Create gallery grid
        const galleryGrid = document.createElement('div');
        galleryGrid.className = 'gallery-grid';

        // Render each photo
        gallery.forEach((photo, index) => {
            const photoWrapper = document.createElement('div');
            photoWrapper.className = 'gallery-item';

            // Create image
            const img = document.createElement('img');
            img.src = photo.dataUrl;
            img.alt = `Saved photo ${index + 1}`;

            // Create metadata
            const metadata = document.createElement('div');
            metadata.className = 'photo-metadata';
            metadata.innerHTML = `
                <p>Type: ${photo.type}</p>
                <p>Saved: ${new Date(photo.timestamp).toLocaleString()}</p>
            `;

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                // Remove this specific photo
                gallery.splice(index, 1);
                localStorage.setItem('colorConnectGallery', JSON.stringify(gallery));
                renderGallery();
            });

            photoWrapper.appendChild(img);
            photoWrapper.appendChild(metadata);
            photoWrapper.appendChild(deleteButton);

            galleryGrid.appendChild(photoWrapper);
        });

        galleryContainer.appendChild(galleryGrid);
    }

    // Render gallery on page load
    renderGallery();

    // Clear gallery button
    clearGalleryButton.addEventListener('click', () => {
        localStorage.removeItem('colorConnectGallery');
        renderGallery();
    });
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
}