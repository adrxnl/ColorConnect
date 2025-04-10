const images = [
  "Timeline Images/The Tribute Money.jpg", 
  "Timeline Images/Federico da Montefeltro and Battista Sforza.webp", 
  "Timeline Images/the Last Supper.jpg", 
  "Timeline Images/Mona Lisa.avif",
  "Timeline Images/The Adoration of the Shepherds,.jpg", 
  "Timeline Images/Feast of the Rose Garlands.jpeg", 
  "Timeline Images/School of Athens.webp", 
  "Timeline Images/The Raphael Cartoons.jpg", 
  "Timeline Images/Vertumnus.jpg", 
  "Timeline Images/Et in Arcadia ego.png",
  "Timeline Images/The Virgin In Prayer.jpg", 
  "Timeline Images/View of Delft.jpg",
  "Timeline Images/The Dancing Couple.jpg", 
  "Timeline Images/Girl with a Pearl Earring .webp", 
  "Timeline Images/Piazza San Marco.jpeg",
  "Timeline Images/The Threshing Ground or Summer .jpg", 
  "Timeline Images/Napoleon Crossing the Alps.jpg", 
  "Timeline Images/Pierre-Auguste Renoir, The Skiff (La Yole).jpg",
  "Timeline Images/Starry Night.jpg", 
  "Timeline Images/The Scream.webp", 
  "Timeline Images/ Apple Tree With Red Fruit.jpg",
  "Timeline Images/Rapallo boats.jpg", 
  "Timeline Images/Throughgoing Line.webp", 
  "Timeline Images/Stateless People, An Assembly.jpeg"
];
const titles = [
  "The Tribute Money (1425)", 
  "Federico da Montefeltro and Battista Sforza (1473 - 1475)", 
  "the Last Supper (1494 - 1498)", 
  "Mona Lisa (1503 - 1519)", 
  "The Adoration of the Shepherds (1505 - 1510)",
  "Feast of the Rose Garlands (1506)", 
  "School of Athens (1508 - 1511)", 
  "The Raphael Cartoons (1545)", 
  "Vertumnus (1590)", 
  "Et in Arcadia ego (1637 - 1638)",
  "The Virgin In Prayer (1650)",
  "View of Delft (1660 - 1661)", 
  "The Dancing Couple (1663)", 
  "Girl with a Pearl Earring (1666)", 
  "Piazza San Marco (1725 - 1727)", 
  "The Threshing Ground or Summer (1786)",
  "Napoleon Crossing the Alps (1800 - 1801)", 
  "Pierre-Auguste Renoir, The Skiff (La Yole) (1879)", 
  "Starry Night (1889)", 
  "The Scream (1893)",
  "Apple Tree With Red Fruit (1902)", 
  "Rapallo boats(1905)", 
  "Throughgoing Line (1923)", 
  "Stateless People, An Assembly (1981 - 1982)"
];
const descriptions = [
  "The Tribute Money is a fresco created by Florentine artist Masaccio about 1426 in the Brancacci Chapel of Santa Maria del Carmine Basilica in Florence, Italy. It is part of a group of early Renaissance frescoes in that chapel that revolutionized Florentine painting and were highly influential throughout the Renaissance. For more information go to <a href='http://britannica.com/topic/The-Tribute-Money' target='_blank'>britannica.com</a>",
  "One of the most celebrated portraits of the Italian Renaissance, the diptych features the Duke of Urbino, Federico da Montefeltro (1422-1482) and his wife Battista Sforza (1446-1472). For more information go to <a href='https://www.uffizi.it/en/artworks/the-duke-and-duchess-of-urbino-federico-da-montefeltro-and-battista-sforza' target='_blank'>uffizi</a>",
  "The Last Supper of Leonardo da Vinci is one of the most famous paintings in the world. It was painted between 1494 and 1498 under the government of Ludovico il Moro. For more information go to <a href='https://www.milan-museum.com/leonardo-last-supper-cenacolo.php' target='_blank'>Milan Museum</a>", 
  "Mona Lisa, oil painting on a poplar wood panel by Leonardo da Vinci, probably the world’s most famous painting. It was painted between 1503 and 1519. For more information go to <a href='https://www.britannica.com/topic/Mona-Lisa-painting' target='_blank'>britannica</a>",
  "The Adoration of the Shepherds, or the Allendale Nativity, is now almost unanimously accepted as Giorgione’s work. For more information go to <a href='https://www.nga.gov/collection/art-object-page.432.html' target='_blank'>NGA</a>",
  "Dürer’s panel was commissioned by German merchants for San Bartolomeo Church in Venice in 1506. For more information go to <a href='https://sbirky.ngprague.cz/en/dielo/CZE:NG.O_1552' target='_blank'>NGP</a>",
  "School of Athens, a fresco painted by Raphael between 1508 and 1511, is one of the most significant artworks of the Renaissance. For more information go to <a href='https://www.britannica.com/topic/School-of-Athens' target='_blank'>britannica</a>",
  "This art piece created in 1545 depicts the biblical moment when Simon is called to be an apostle by Jesus. For more information go to <a href='https://www.vam.ac.uk/articles/the-raphael-cartoons-the-miraculous-draught-of-fishes#slideshow=85409956&slide=0' target='_blank'>VAM</a>",
  "The painting Vertumnus was created by Giuseppe Arcimboldo as a gift to Emperor Rudolf II. For more information go to <a href='https://artsandculture.google.com/story/a-face-of-fruit-composed-skokloster-castle/bwWB9-_iPQ-cKQ?hl=en' target='_blank'>artsandculture</a>",
  "Three Sicilian shepherds and a woman gather around a tomb in Arcadia. For more information go to <a href='https://www.historytoday.com/archive/foundations/et-arcadia-ego' target='_blank'>History Today</a>",
  "A baroque style painting from the 17th century depicting St Gregory the Great in prayer. For more information go to <a href='https://www.newliturgicalmovement.org/2015/09/sassoferratos-virgin-at-prayer-for.html' target='_blank'>newliturgicalmovement</a>",
  "A famous 17th-century cityscape of Delft by Vermeer. For more information go to <a href='https://www.mauritshuis.nl/en/our-collection/artworks/92-view-of-delft' target='_blank'>mauritshuis.nl</a>",
  "Jan Steen’s painting of a dancing couple showcases scenes from everyday life. For more information go to <a href='https://www.nga.gov/collection/art-object-page.1220.html' target='_blank'>NGA</a>",
  "Girl with a Pearl Earring, a masterpiece from the Dutch Golden Age, is known for its enigmatic subject. For more information go to <a href='https://www.frick.org/exhibitions/mauritshuis/670' target='_blank'>Frick.org</a>",
  "A famous view of Piazza San Marco painted by Canaletto between 1725 and 1727. For more information go to <a href='http://metmuseum.org/art/collection/search/435839' target='_blank'>metmuseum</a>",
  "Goya’s painting of harvesters, known as The Threshing Ground or Summer, depicts a scene of rural life. For more information go to <a href='https://www.museodelprado.es/en/the-collection/art-work/the-threshing-ground-or-summer/ec1c94c1-b21c-4330-9516-1c0d8078e87e' target='_blank'>museodelprado</a>",
  "Napoleon Crossing the Alps, an equestrian portrait, symbolizes authority and leadership. For more information go to <a href='https://smarthistory.org/jacques-louis-david-napoleon-crossing-the-alps/' target='_blank'>smarthistory</a>",
  "Renoir’s The Skiff (La Yole) from 1879 depicts a serene scene along the Seine with leisure boats and a relaxed atmosphere. For more information go to <a href='https://colourlex.com/project/renoir-la-yole/' target='_blank'>colourlex</a>",
  "Vincent van Gogh painted Starry Night in 1889 during his stay at the asylum of Saint-Paul-de-Mausole. For more information go to <a href='https://www.vangoghgallery.com/painting/starry-night.html' target='_blank'>vangoghgallery</a>",
  "Munch's The Scream is an icon of modern art, capturing intense emotion. For more information go to <a href='https://www.edvardmunch.org/the-scream.jsp' target='_blank'>edvardmunch</a>",
  "Apple Tree With Red Fruit, painted in 1902, shows the influence of Japanese prints. For more information go to <a href='https://www.overstockart.com/painting/apple-tree-with-red-fruit' target='_blank'>overstockart</a>",
  "Rapallo Boats (1905) by Kandinsky features vibrant coastal scenes and dynamic brushstrokes. For more information go to <a href='https://www.artchive.com/artwork/rapallo-boats-wassily-kandinsky-1905/' target='_blank'>artchive</a>",
  "Throughgoing Line, created in 1923 by Kandinsky, exemplifies Expressionism. For more information go to <a href='https://arabelart.com/products/throughgoing-line?variant=47369099804914' target='_blank'>arabelart</a>",
  "Stateless People, An Assembly by Uzo Egonu depicts a group of people facing marginalization. For more information go to <a href='https://www.arthistoryproject.com/artists/uzo-egonu/stateless-people-an-assembly/' target='_blank'>arthistoryproject</a>"
];

let currentIndex = 0;
const imgElement = document.getElementById("timelineImage");
const titleElement = document.getElementById("imageTitle");
const descElement = document.getElementById("description");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
function updateDisplay() {
  imgElement.src = images[currentIndex] || "";
  titleElement.innerText = titles[currentIndex] || "Image Title";
  descElement.innerHTML = descriptions[currentIndex] || "Description goes here...";
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateDisplay();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateDisplay();
}

// Updated filter function using SVG filters for realistic simulation.
function applyFilter(type) {
  switch (type) {
    case 'protanopia':
      imgElement.style.filter = "url(#protanopia)";
      break;
    case 'deuteranopia':
      imgElement.style.filter = "url(#deuteranopia)";
      break;
    case 'tritanopia':
      imgElement.style.filter = "url(#tritanopia)";
      break;
    default:
      imgElement.style.filter = "none";
  }
}

updateDisplay();
let searchResultsArray = [];

function searchImages(input) {
  searchResults.innerHTML = "";
  searchResultsArray = [];
  
  if (!input.trim()) {
    searchResults.style.display = "none";
    return;
  }
  
  const inputLower = input.toLowerCase();
  
  for (let i = 0; i < titles.length; i++) {
    if (titles[i].toLowerCase().includes(inputLower) || 
        descriptions[i].toLowerCase().includes(inputLower)) {
      searchResultsArray.push(i);
    }
  }
 
  if (searchResultsArray.length > 0) {
    searchResults.style.display = "block";
    
    searchResultsArray.forEach(index => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.textContent = titles[index];
      resultItem.addEventListener("click", function() {
        currentIndex = index;
        updateDisplay();
        searchResults.style.display = "none";
        searchInput.value = "";
      });
      searchResults.appendChild(resultItem);
    });
  } else {
    searchResults.style.display = "block";
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = "No matching artworks found";
    searchResults.appendChild(noResults);
  }
}

if (searchButton) {
  searchButton.addEventListener("click", function() {
    searchImages(searchInput.value);
  });
}

if (searchInput) {
  searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      searchImages(searchInput.value);
    }
    
    if (searchInput.value.length >= 3) {
      searchImages(searchInput.value);
    } else if (searchInput.value.length === 0) {
      searchResults.style.display = "none";
    }
  });
}

document.addEventListener("click", function(event) {
  if (event.target !== searchInput && event.target !== searchResults && 
      !searchResults.contains(event.target) && event.target !== searchButton) {
    searchResults.style.display = "none";
  }
});
<<<<<<< HEAD
=======
let searchResultsArray = [];

function searchImages(input) {
  searchResults.innerHTML = "";
  searchResultsArray = [];
  
  if (!input.trim()) {
    searchResults.style.display = "none";
    return;
  }
  
  const inputLower = input.toLowerCase();
  
  for (let i = 0; i < titles.length; i++) {
    if (titles[i].toLowerCase().includes(inputLower) || 
        descriptions[i].toLowerCase().includes(inputLower)) {
      searchResultsArray.push(i);
    }
  }
 
  if (searchResultsArray.length > 0) {
    searchResults.style.display = "block";
    
    searchResultsArray.forEach(index => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.textContent = titles[index];
      resultItem.addEventListener("click", function() {
        currentIndex = index;
        updateDisplay();
        searchResults.style.display = "none";
        searchInput.value = "";
      });
      searchResults.appendChild(resultItem);
    });
  } else {
    searchResults.style.display = "block";
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = "No matching artworks found";
    searchResults.appendChild(noResults);
  }
}

if (searchButton) {
  searchButton.addEventListener("click", function() {
    searchImages(searchInput.value);
  });
}

if (searchInput) {
  searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      searchImages(searchInput.value);
    }
    
    if (searchInput.value.length >= 3) {
      searchImages(searchInput.value);
    } else if (searchInput.value.length === 0) {
      searchResults.style.display = "none";
    }
  });
}

document.addEventListener("click", function(event) {
  if (event.target !== searchInput && event.target !== searchResults && 
      !searchResults.contains(event.target) && event.target !== searchButton) {
    searchResults.style.display = "none";
  }
});
