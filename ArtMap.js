function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
}

const map = L.map('map').setView([30, 0], 2); // Setting a more global view initially
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create custom icons for museums and artworks with different colors
const museumIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color:#4285F4; width:15px; height:15px; border-radius:50%; border:2px solid white;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10]
});

const artworkIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color:#DB4437; width:15px; height:15px; border-radius:50%; border:2px solid white;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10]
});

// Art Museums & Galleries
const museums = [
  {
      name: "Metropolitan Museum of Art",
      location: [40.7794, -73.9632],
      city: "New York City, USA",
      description: "One of the world's largest and most visited art museums",
      collection: "Over 2 million works spanning 5,000+ years"
  },
  {
      name: "Louvre Museum",
      location: [48.8606, 2.3376],
      city: "Paris, France",
      description: "World's largest art museum and historic monument",
      collection: "Nearly 40,000 objects from prehistory to the 21st century"
  },
  {
      name: "British Museum",
      location: [51.5194, -0.1269],
      city: "London, UK",
      description: "Dedicated to human history, art and culture",
      collection: "About 8 million works from all continents"
  },
  {
      name: "State Hermitage Museum",
      location: [59.9410, 30.3129],
      city: "Saint Petersburg, Russia",
      description: "Second-largest art museum in the world",
      collection: "Over 3 million items including paintings, sculptures and antiquities"
  },
  {
      name: "Uffizi Gallery",
      location: [43.7677, 11.2553],
      city: "Florence, Italy",
      description: "Famous for its Renaissance art collection",
      collection: "Masterpieces from artists like Botticelli, Michelangelo, and Leonardo da Vinci"
  },
  {
      name: "Art Institute of Chicago",
      location: [41.8796, -87.6237],
      city: "Chicago, USA",
      description: "One of the oldest and largest art museums in the United States",
      collection: "Impressionist and Post-Impressionist art, along with American art"
  },
  {
      name: "Nelson-Atkins Museum of Art",
      location: [39.0455, -94.5810],
      city: "Kansas City, USA",
      description: "Known for its neoclassical architecture and extensive collection",
      collection: "Asian art, European paintings, and American paintings"
  },
  {
      name: "Montreal Museum of Fine Arts",
      location: [45.4986, -73.5795],
      city: "Montreal, Canada",
      description: "Largest art museum in Montreal",
      collection: "Canadian art, International art, decorative arts"
  },
  {
      name: "Art Gallery of Ontario",
      location: [43.6536, -79.3927],
      city: "Toronto, Canada",
      description: "One of the largest galleries in North America",
      collection: "Over 90,000 works spanning 2,000 years"
  },
  {
      name: "National Gallery",
      location: [51.5089, -0.1283],
      city: "London, UK",
      description: "Art museum on Trafalgar Square",
      collection: "Western European paintings from the 13th to the 19th centuries"
  },
  {
      name: "Rijksmuseum",
      location: [52.3600, 4.8852],
      city: "Amsterdam, Netherlands",
      description: "Dutch national museum dedicated to arts and history",
      collection: "Works by Rembrandt, Vermeer, and other Dutch Masters"
  },
  {
      name: "Museo del Prado",
      location: [40.4138, -3.6922],
      city: "Madrid, Spain",
      description: "Spain's national art museum",
      collection: "European art from the 12th to early 20th centuries"
  },
  {
      name: "Museum of Modern Art (MoMA)",
      location: [40.7614, -73.9776],
      city: "New York City, USA",
      description: "Dedicated to developing and collecting modern art",
      collection: "Works by Picasso, van Gogh, Warhol, and other modern masters"
  },
  {
      name: "National Gallery of Art",
      location: [38.8913, -77.0200],
      city: "Washington D.C., USA",
      description: "National art museum of the United States",
      collection: "Over 150,000 paintings, sculptures, and decorative arts"
  },
  {
      name: "Musée d'Orsay",
      location: [48.8600, 2.3266],
      city: "Paris, France",
      description: "Museum housed in the former Orsay railway station",
      collection: "French art from 1848 to 1914, including impressionist masterpieces"
  },
  {
      name: "Tate Modern",
      location: [51.5076, -0.0994],
      city: "London, UK",
      description: "Britain's national gallery of international modern art",
      collection: "International modern and contemporary art from 1900 to the present day"
  },
  {
      name: "National Museum of Art",
      location: [59.9156, 10.7386],
      city: "Oslo, Norway",
      description: "Norway's largest collection of art",
      collection: "Works by Edvard Munch including 'The Scream'"
  },
  {
      name: "Van Gogh Museum",
      location: [52.3584, 4.8811],
      city: "Amsterdam, Netherlands",
      description: "Dedicated to the works of Vincent van Gogh",
      collection: "The largest collection of Van Gogh's paintings and drawings in the world"
  }
];

// Famous Art Pieces
const artworks = [
  {
      name: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: "c. 1503-1506",
      location: [48.8606, 2.3376], // Louvre Museum
      museum: "Louvre Museum",
      description: "One of the most famous portraits in Western art"
  },
  {
      name: "Starry Night",
      artist: "Vincent van Gogh",
      year: "1889",
      location: [40.7614, -73.9776], // MoMA
      museum: "Museum of Modern Art (MoMA)",
      description: "Van Gogh's most famous work depicting a night scene with swirling clouds"
  },
  {
      name: "American Gothic",
      artist: "Grant Wood",
      year: "1930",
      location: [41.8796, -87.6237], // Art Institute of Chicago
      museum: "Art Institute of Chicago",
      description: "Iconic portrayal of a farmer standing beside his daughter"
  },
  {
      name: "The Scream",
      artist: "Edvard Munch",
      year: "1893",
      location: [59.9156, 10.7386], // National Gallery of Norway
      museum: "National Museum of Art, Norway",
      description: "Expressionist painting depicting a figure with an agonized expression"
  },
  {
      name: "Group of Seven Collection",
      artist: "Various Canadian Artists",
      year: "1920-1933",
      location: [43.6536, -79.3927], // Art Gallery of Ontario
      museum: "Art Gallery of Ontario",
      description: "Iconic Canadian landscape paintings"
  },
  {
      name: "The Sleeping Venus",
      artist: "Paul Delvaux",
      year: "1944",
      location: [45.4986, -73.5795], // Montreal Museum of Fine Arts
      museum: "Montreal Museum of Fine Arts",
      description: "Surrealist painting depicting a dream-like scene with Venus"
  },
  {
      name: "Autumn Rhythm (Number 30)",
      artist: "Jackson Pollock",
      year: "1950",
      location: [40.7794, -73.9632], // The Met
      museum: "Metropolitan Museum of Art",
      description: "Famous abstract expressionist painting"
  },
  {
      name: "The Night Watch",
      artist: "Rembrandt van Rijn",
      year: "1642",
      location: [52.3600, 4.8852], // Rijksmuseum
      museum: "Rijksmuseum",
      description: "Dutch Golden Age masterpiece showing Captain Frans Banning Cocq's militia company"
  },
  {
      name: "Water Lilies",
      artist: "Claude Monet",
      year: "1914-1926",
      location: [48.8600, 2.3266], // Musée d'Orsay
      museum: "Musée d'Orsay",
      description: "Series of approximately 250 oil paintings depicting Monet's flower garden"
  },
  {
      name: "Les Demoiselles d'Avignon",
      artist: "Pablo Picasso",
      year: "1907",
      location: [40.7614, -73.9776], // MoMA
      museum: "Museum of Modern Art (MoMA)",
      description: "Revolutionary work that influenced the development of Cubism"
  },
  {
      name: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: "1931",
      location: [40.7614, -73.9776], // MoMA
      museum: "Museum of Modern Art (MoMA)",
      description: "Famous surrealist work with melting clocks in a dreamscape"
  },
  {
      name: "The Birth of Venus",
      artist: "Sandro Botticelli",
      year: "c. 1484-1486",
      location: [43.7677, 11.2553], // Uffizi Gallery
      museum: "Uffizi Gallery",
      description: "Depicts the goddess Venus arriving at the shore after her birth"
  },
  {
      name: "Guernica",
      artist: "Pablo Picasso",
      year: "1937",
      location: [40.4138, -3.6922], // Museo Reina Sofía (near Prado)
      museum: "Museo Reina Sofía",
      description: "Powerful anti-war painting depicting the bombing of Guernica during Spanish Civil War"
  },
  {
      name: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer",
      year: "c. 1665",
      location: [52.0799, 4.3111], // Mauritshuis
      museum: "Mauritshuis",
      description: "Portrait of a young woman with a pearl earring, sometimes called 'Dutch Mona Lisa'"
  },
  {
      name: "The Garden of Earthly Delights",
      artist: "Hieronymus Bosch",
      year: "1490-1510",
      location: [40.4138, -3.6922], // Prado Museum
      museum: "Museo del Prado",
      description: "Triptych depicting paradise, earthly pleasure, and hell"
  },
  {
      name: "The Great Wave off Kanagawa",
      artist: "Katsushika Hokusai",
      year: "c. 1830-1832",
      location: [35.7188, 139.7766], // Tokyo National Museum (approximation)
      museum: "Tokyo National Museum",
      description: "Ukiyo-e woodblock print of a giant wave threatening boats near Mount Fuji"
  },
  {
      name: "The Creation of Adam",
      artist: "Michelangelo",
      year: "c. 1512",
      location: [41.9029, 12.4534], // Sistine Chapel
      museum: "Vatican Museums (Sistine Chapel)",
      description: "Part of the Sistine Chapel ceiling fresco depicting God giving life to Adam"
  },
  {
      name: "Sunflowers",
      artist: "Vincent van Gogh",
      year: "1888",
      location: [51.5089, -0.1283], // National Gallery
      museum: "National Gallery",
      description: "Series of still life paintings depicting sunflowers in a vase"
  }
];

// Addding museums to the map
museums.forEach(museum => {
  L.marker(museum.location, {icon: museumIcon})
      .addTo(map)
      .bindPopup(`
          <div style="max-width: 250px;">
              <h3 style="margin: 0 0 5px 0;">${museum.name}</h3>
              <p style="margin: 0 0 5px 0;"><i>${museum.city}</i></p>
              <p style="margin: 0 0 5px 0;">${museum.description}</p>
              <p style="margin: 0;"><b>Collection:</b> ${museum.collection}</p>
          </div>
      `);
});

// Adding artworks to the map 
artworks.forEach(artwork => {
  L.marker(artwork.location, {icon: artworkIcon})
      .addTo(map)
      .bindPopup(`
          <div style="max-width: 250px;">
              <h3 style="margin: 0 0 5px 0;">${artwork.name}</h3>
              <p style="margin: 0 0 5px 0;"><i>By ${artwork.artist}, ${artwork.year}</i></p>
              <p style="margin: 0 0 5px 0;"><b>Location:</b> ${artwork.museum}</p>
              <p style="margin: 0;">${artwork.description}</p>
          </div>
      `);
});

// User Location & Routing
navigator.geolocation.getCurrentPosition(success, error);

function success(pos) {
  const userCoords = [pos.coords.latitude, pos.coords.longitude];
  
  // Marker for the user location
  const userMarker = L.marker(userCoords)
      .addTo(map)
      .bindPopup("<b>You are here</b>")
      .openPopup();
  
  // Find the nearest museum
  let nearestMuseum = null;
  let shortestDistance = Infinity;
  
  museums.forEach(museum => {
      const distance = calculateDistance(userCoords[0], userCoords[1], museum.location[0], museum.location[1]);
      if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestMuseum = museum;
      }
  });
  
  if (nearestMuseum) {
      // Calculate distance in km
      const distanceInKm = Math.round(shortestDistance);
      
      // Add popup to the nearest museum highlighting it's the nearest
      L.marker(nearestMuseum.location, {icon: museumIcon})
          .addTo(map)
          .bindPopup(`
              <div style="max-width: 250px;">
                  <h3 style="margin: 0 0 5px 0;">${nearestMuseum.name}</h3>
                  <p style="margin: 0 0 5px 0;"><i>${nearestMuseum.city}</i></p>
                  <p style="margin: 0 0 5px 0;"><b>Distance from you:</b> ${distanceInKm} km</p>
                  <p style="margin: 0 0 5px 0;">${nearestMuseum.description}</p>
                  <p style="margin: 0;"><b>Collection:</b> ${nearestMuseum.collection}</p>
              </div>
          `)
          .openPopup();
      
      // Set view to fit both user and nearest museum
      map.fitBounds(L.latLngBounds([userCoords, nearestMuseum.location]), { padding: [50, 50] });
  } else {
      // Just focus on user if no museum found
      map.setView(userCoords, 10);
  }
}

function error(err) {
  console.warn("Geolocation error:", err);
  alert("Could not retrieve your location. Using default map view.");
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}

// Add legend
const legend = L.control({position: 'bottomright'});
legend.onAdd = function() {
  const div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = `
      <div style="background-color: white; padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
          <div style="margin-bottom: 5px;">
              <span style="display: inline-block; width:15px; height:15px; border-radius:50%; background-color:#4285F4; border:2px solid white;"></span>
              <span style="margin-left: 5px;">Museums</span>
          </div>
          <div>
              <span style="display: inline-block; width:15px; height:15px; border-radius:50%; background-color:#DB4437; border:2px solid white;"></span>
              <span style="margin-left: 5px;">Artworks</span>
          </div>
      </div>
  `;
  return div;
};
legend.addTo(map);

// Add a button to show all markers
const resetViewButton = L.control({position: 'topleft'});
resetViewButton.onAdd = function() {
  const div = L.DomUtil.create('div', 'reset-view-button');
  div.innerHTML = `
      <button onclick="resetMapView()" style="background-color: white; padding: 5px 10px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
          Show All Museums
      </button>
  `;
  return div;
};
resetViewButton.addTo(map);

// Function to reset map view
function resetMapView() {
  // Create an array of all marker locations
  const allLocations = [...museums.map(m => m.location), ...artworks.map(a => a.location)];
  
  // Create a bounds object
  const bounds = L.latLngBounds(allLocations);
  
  // Fit the map to these bounds
  map.fitBounds(bounds, {padding: [50, 50]});
}