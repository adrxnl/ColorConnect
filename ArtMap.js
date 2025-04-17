function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
}

const map = L.map('map').setView([36.5, -98], 5); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    //Art Pieces
    L.marker([48.8566, 2.3522])
        .addTo(map)
        .bindPopup("<b>Mona Lisa</b><br>Origin: Paris, France");

    //Galleries
    L.marker([40.7794, -73.9632]) 
        .addTo(map)
        .bindPopup("<b>Metropolitan Museum of Art</b><br>Gallery in NYC");

        navigator.geolocation.getCurrentPosition(success, error);

        function success(pos) {
          const userCoords = [pos.coords.latitude, pos.coords.longitude];
        
          // Add marker for user location
          L.marker(userCoords).addTo(map).bindPopup("You are here").openPopup();
        
          // Optional: Fly to user location
          map.setView(userCoords, 13);
        
          // Add route from user to a gallery
          L.Routing.control({
            waypoints: [
              L.latLng(userCoords),
              L.latLng(40.7794, -73.9632) // Example: The Met in NYC
            ],
            routeWhileDragging: false
          }).addTo(map);
        }
        
        function error(err) {
          alert("Could not retrieve your location");
        }
        