function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
}

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const map = L.map('map').setView([36.5, -98], 5); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    //Art Pieces
    L.marker([48.8566, 2.3522])
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <h3>Mona Lisa</h3>
            <p>Origin: Paris, France</p>
            <img src="Timeline Images/Mona Lisa.avif" 
                 alt="Mona Lisa" width="150" style="border-radius: 8px;"/>
          </div>
        `);

    //Galleries
    L.marker([40.7794, -73.9632], {icon: greenIcon})
        .addTo(map)
        .bindPopup("<b>Metropolitan Museum of Art</b><br>Gallery in NYC");

        navigator.geolocation.getCurrentPosition(success, error);

        function success(pos) {
          const userCoords = [pos.coords.latitude, pos.coords.longitude];
        
          // Add marker for user location
          L.marker(userCoords, {icon: redIcon}).addTo(map).bindPopup("You are here").openPopup();
        
          // Optional: Fly to user location
          map.setView(userCoords, 8);
        
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
        