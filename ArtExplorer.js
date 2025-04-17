// =============== Color Simulation Matrices ===============
const colorMatrices = {
  protanopia: [0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0],
  deuteranopia: [0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0],
  tritanopia: [0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0]
};

const artworkDatabase = [
  {
    id: 1,
    title: "Apple Tree With Red Fruit",
    artist: "Unknown",
    year: "Modern",
    movement: "Expressionism",
    description: "A colorful depiction of a tree and landscape, rich with stylized form and motion.",
    image: "Timeline Images/Apple Tree With Red Fruit.jpg"
  },
  {
    id: 2,
    title: "Christ in the House of Martha and Mary",
    artist: "Johannes Vermeer",
    year: "1654-1655",
    movement: "Baroque",
    description: "A rare religious painting by Vermeer showing Christ with two sisters in a quiet interior.",
    image: "Timeline Images/Christ in the House of Martha and Mary.jpg"
  },
  {
    id: 3,
    title: "Et in Arcadia ego",
    artist: "Nicolas Poussin",
    year: "1637–1638",
    movement: "Baroque",
    description: "Depicts shepherds around a tomb in the idealized landscape of Arcadia.",
    image: "Timeline Images/Et in Arcadia ego.png"
  },
  {
    id: 4,
    title: "Feast of the Rose Garlands",
    artist: "Albrecht Dürer",
    year: "1506",
    movement: "Renaissance",
    description: "A devotional work showing the Madonna and Child with saints and the emperor.",
    image: "Timeline Images/Feast of the Rose Garlands.jpeg"
  },
  {
    id: 5,
    title: "Federico da Montefeltro and Battista Sforza",
    artist: "Piero della Francesca",
    year: "1465–1472",
    movement: "Early Renaissance",
    description: "A famous diptych of Duke Federico and his wife in strict profile.",
    image: "Timeline Images/Federico da Montefeltro and Battista Sforza.webp"
  },
  {
    id: 6,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "1665",
    movement: "Baroque",
    description: "Often called the 'Mona Lisa of the North', showing a girl with an exotic turban and earring.",
    image: "Timeline Images/Girl with a Pearl Earring .webp"
  },
  {
    id: 7,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "1503–1506",
    movement: "Renaissance",
    description: "The most famous portrait ever painted, known for its enigmatic smile.",
    image: "Timeline Images/Mona Lisa.avif"
  },
  {
    id: 8,
    title: "Napoleon Crossing the Alps",
    artist: "Jacques-Louis David",
    year: "1801",
    movement: "Neoclassicism",
    description: "Propagandistic portrait of Napoleon leading his troops through the Alps.",
    image: "Timeline Images/Napoleon Crossing the Alps.jpg"
  },
  {
    id: 9,
    title: "Piazza San Marco",
    artist: "Canaletto",
    year: "1730",
    movement: "Venetian View Painting",
    description: "Iconic cityscape of Venice's central square with bustling life and architecture.",
    image: "Timeline Images/Piazza San Marco.jpeg"
  },
  {
    id: 10,
    title: "The Skiff (La Yole)",
    artist: "Pierre-Auguste Renoir",
    year: "1875",
    movement: "Impressionism",
    description: "Two women in a canoe on the Seine, shimmering with color and light.",
    image: "Timeline Images/Pierre-Auguste Renoir, The Skiff (La Yole).jpg"
  },
  {
    id: 11,
    title: "Rapallo Boats",
    artist: "Othon Friesz",
    year: "1906",
    movement: "Fauvism",
    description: "Vivid brushstrokes and saturated colors capture boats by a colorful village.",
    image: "Timeline Images/Rapallo boats.jpg"
  },
  {
    id: 12,
    title: "School of Athens",
    artist: "Raphael",
    year: "1509–1511",
    movement: "Renaissance",
    description: "Fresco celebrating philosophy, featuring Plato, Aristotle, and others in a grand hall.",
    image: "Timeline Images/School of Athens.webp"
  },
  {
    id: 13,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    movement: "Post-Impressionism",
    description: "Swirling night sky over a sleepy village, expressing Van Gogh's emotional intensity.",
    image: "Timeline Images/Starry Night.jpg"
  },
  {
    id: 14,
    title: "Stateless People, An Assembly",
    artist: "Unknown",
    year: "20th Century",
    movement: "Modernist Abstraction",
    description: "An abstract depiction of human forms and community in bold shapes and colors.",
    image: "Timeline Images/Stateless People, An Assembly.jpeg"
  },
  {
    id: 15,
    title: "The Adoration of the Shepherds",
    artist: "Giorgione",
    year: "c. 1505",
    movement: "High Renaissance",
    description: "Intimate nativity scene in a rustic grotto, with masterful landscape perspective.",
    image: "Timeline Images/The Adoration of the Shepherds,.jpg"
  },
  {
    id: 16,
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: "1495–1498",
    movement: "Renaissance",
    description: "The iconic depiction of Jesus' final meal with his disciples.",
    image: "Timeline Images/the Last Supper.jpg"
  },
  {
    id: 17,
    title: "The Raphael Cartoons",
    artist: "Raphael",
    year: "1515–1516",
    movement: "Renaissance",
    description: "Tapestry designs portraying scenes from the lives of Saints Peter and Paul.",
    image: "Timeline Images/The Raphael Cartoons.jpg"
  },
  {
    id: 18,
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    movement: "Expressionism",
    description: "A tormented figure under a fiery sky, symbolizing anxiety and despair.",
    image: "Timeline Images/The Scream.webp"
  },
  {
    id: 19,
    title: "The Threshing Ground (Summer)",
    artist: "Francisco de Goya",
    year: "1786",
    movement: "Romanticism",
    description: "Rustic scene with peasants working a haystack — full of human energy and motion.",
    image: "Timeline Images/The Threshing Ground or Summer .jpg"
  },
  {
    id: 20,
    title: "The Virgin in Prayer",
    artist: "Giovanni Battista Salvi da Sassoferrato",
    year: "1640–1650",
    movement: "Baroque",
    description: "A serene depiction of the Virgin Mary in prayer, symbolizing devotion and purity.",
    image: "Timeline Images/The Virgin In Prayer.jpg"
  },
  {
    id: 21,
    title: "Throughgoing Line",
    artist: "Wassily Kandinsky",
    year: "1923",
    movement: "Abstract",
    description: "An explosion of lines and geometric forms, expressing rhythm and motion in pure abstraction.",
    image: "Timeline Images/Throughgoing Line.webp"
  },
  {
    id: 22,
    title: "Vertumnus",
    artist: "Giuseppe Arcimboldo",
    year: "1590",
    movement: "Mannerism",
    description: "A whimsical portrait made entirely from fruits and vegetables, symbolizing transformation and abundance.",
    image: "Timeline Images/Vertumnus.jpg"
  },
  {
    id: 23,
    title: "View of Delft",
    artist: "Johannes Vermeer",
    year: "1660–1661",
    movement: "Baroque",
    description: "One of the most celebrated cityscapes in art history, capturing the quiet charm of Delft under dramatic skies.",
    image: "Timeline Images/View of Delft.jpg"
  }
];

// =============== DOM Setup ===================
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchType = document.getElementById("search-type");
  const loading = document.getElementById("search-loading");
  const noResults = document.getElementById("no-results");
  const resultsContainer = document.getElementById("results-container");
  const resultsGrid = document.getElementById("results-grid");
  const shareBtn = document.getElementById("share-artwork");
  const shareModal = document.getElementById("share-modal");
  const closeShareModal = document.querySelector(".close-share-modal");
  const shareEmailBtn = document.getElementById("share-email");
  const shareFacebookBtn = document.getElementById("share-facebook");
  const shareTwitterBtn = document.getElementById("share-twitter");
  const shareLinkBtn = document.getElementById("share-link");
  const shareLinkBox = document.getElementById("share-link-box");
  const shareLinkInput = document.getElementById("share-link-input");
  const copyLinkBtn = document.getElementById("copy-link");
  const copyConfirm = document.getElementById("copy-confirm");

  // =============== Search Functionality ===================
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const term = searchInput.value.trim().toLowerCase();
    const type = searchType.value;
    if (!term) return;

    loading.classList.remove("hidden");
    noResults.classList.add("hidden");
    resultsContainer.classList.add("hidden");

    setTimeout(() => {
      const results = artworkDatabase.filter((artwork) => {
        const value = artwork[type]?.toLowerCase();
        return value && value.includes(term);
      });
      displayResults(results);
    }, 300);
  });

  function displayResults(results) {
    loading.classList.add("hidden");
    resultsGrid.innerHTML = "";

    if (results.length === 0) {
      noResults.classList.remove("hidden");
      resultsContainer.classList.add("hidden");
      return;
    }

    noResults.classList.add("hidden");
    resultsContainer.classList.remove("hidden");

    results.forEach((artwork) => {
      const card = document.createElement("div");
      card.className = "result-card";

      const img = document.createElement("img");
      img.className = "result-image";
      img.src = artwork.image;
      img.alt = artwork.title;
      img.onerror = () => {
        img.src = "images/placeholder.jpg"; // Fallback image if artwork not found
      };

      const info = document.createElement("div");
      info.className = "result-info";
      info.innerHTML = `
        <h3 class="result-title">${artwork.title}</h3>
        <p class="result-artist">${artwork.artist}</p>
      `;

      card.appendChild(img);
      card.appendChild(info);
      card.addEventListener("click", () => openArtworkModal(artwork));
      resultsGrid.appendChild(card);
    });
  }

  // =============== Modal + Filter UI ===================
  const artworkModal = document.getElementById("artwork-modal");
  const modalCanvas = document.getElementById("modal-canvas");
  const modalTitle = document.getElementById("modal-title");
  const modalArtist = document.getElementById("modal-artist");
  const modalYear = document.getElementById("modal-year");
  const modalMovement = document.getElementById("modal-movement");
  const modalDescription = document.getElementById("modal-description");
  const closeModalBtn = document.querySelector(".close-modal");
  const downloadBtn = document.getElementById("download-artwork");
  const saveBtn = document.getElementById("save-artwork");

  const modalFilterBtns = document.querySelectorAll(".modal-filter-btn");
  const modalIntensitySlider = document.getElementById("modal-intensity-slider");
  const modalIntensityValue = document.getElementById("modal-intensity-value");

  let currentArtwork = null;
  let currentFilter = 'none';
  let currentImage = new Image();

  // =============== Modal Functions ===================
  function openArtworkModal(artwork) {
    currentArtwork = artwork;
    currentFilter = 'none';

    modalTitle.textContent = artwork.title;
    modalArtist.textContent = artwork.artist;
    modalYear.textContent = `Year: ${artwork.year}`;
    modalMovement.textContent = `Movement: ${artwork.movement}`;
    modalDescription.textContent = `Description: ${artwork.description}`;

    // Reset filter buttons
    modalFilterBtns.forEach(btn => btn.classList.remove('active'));
    modalFilterBtns[0].classList.add('active'); // Normal View

    // Reset slider
    modalIntensitySlider.value = 100;
    modalIntensityValue.textContent = "100%";

    // Load image into canvas
    currentImage = new Image();
    currentImage.crossOrigin = "anonymous"; // Enable cross-origin loading if needed
    currentImage.onload = () => {
      renderImageWithFilter(currentImage, 'none', 100);
    };
    currentImage.onerror = () => {
      console.error("Error loading image:", artwork.image);
      // You could set a placeholder image here
    };
    currentImage.src = artwork.image;

    artworkModal.classList.remove("hidden");
  }

  closeModalBtn.addEventListener("click", () => {
    artworkModal.classList.add("hidden");
  });

  // =============== Filter Logic ===================
  modalFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modalFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderImageWithFilter(currentImage, currentFilter, modalIntensitySlider.value);
    });
  });

  modalIntensitySlider.addEventListener("input", () => {
    modalIntensityValue.textContent = `${modalIntensitySlider.value}%`;
    renderImageWithFilter(currentImage, currentFilter, modalIntensitySlider.value);
  });

  function applyColorMatrix(imageData, matrix, intensity = 1) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const newR = r * matrix[0] + g * matrix[1] + b * matrix[2];
      const newG = r * matrix[5] + g * matrix[6] + b * matrix[7];
      const newB = r * matrix[10] + g * matrix[11] + b * matrix[12];
      
      // Blend original and filtered colors based on intensity
      data[i] = r * (1 - intensity) + newR * intensity;
      data[i + 1] = g * (1 - intensity) + newG * intensity;
      data[i + 2] = b * (1 - intensity) + newB * intensity;
      // Alpha channel remains unchanged (data[i + 3])
    }
    return imageData;
  }

  function renderImageWithFilter(img, filter = 'none', intensity = 100) {
    if (!img.complete || img.naturalWidth === 0) {
      console.log("Image not fully loaded yet");
      return; // Exit if image isn't fully loaded
    }

    const ctx = modalCanvas.getContext("2d");
    
    // Set canvas dimensions to match the image
    modalCanvas.width = img.naturalWidth;
    modalCanvas.height = img.naturalHeight;
    
    // Clear canvas and draw original image
    ctx.clearRect(0, 0, modalCanvas.width, modalCanvas.height);
    ctx.drawImage(img, 0, 0);

    // Apply color filter if needed
    if (filter !== 'none' && colorMatrices[filter]) {
      try {
        const imageData = ctx.getImageData(0, 0, modalCanvas.width, modalCanvas.height);
        const matrix = colorMatrices[filter];
        const result = applyColorMatrix(imageData, matrix, intensity / 100);
        ctx.putImageData(result, 0, 0);
      } catch (err) {
        console.error("Error applying filter:", err);
      }
    }

    // Update download link with current canvas state
    modalCanvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        downloadBtn.href = url;
        downloadBtn.download = `${currentArtwork.title.replace(/\s+/g, "_")}_${filter}.png`;
      }
    });
  }

  // =============== Save to Gallery ===================
  saveBtn.addEventListener("click", () => {
    modalCanvas.toBlob(blob => {
      if (!blob) {
        alert("Unable to save artwork. Please try again.");
        return;
      }

      let gallery = JSON.parse(localStorage.getItem("colorConnectGallery") || "[]");
      
      const imageID = `photo_${Date.now()}`;

      const reader = new FileReader();
      reader.onloadend = () => {
        const photoObject1 = {
          id: imageID,
          dataUrl: reader.result,
          type: this.filter,
          timestamp: new Date().toISOString()
        };

        gallery.push(photoObject1);

        localStorage.setItem("colorConnectGallery", JSON.stringify(gallery));
        alert("Artwork saved to gallery!");
      };
      reader.readAsDataURL(blob);
    });
  });

  // =============== Share Functionality ===================
  shareBtn.addEventListener("click", () => {
    shareModal.classList.remove("hidden");
    
    // Generate a share link (this would normally link to your website with the artwork ID)
    const shareUrl = `https://colorconnect.example.com/share?id=${currentArtwork.id}&filter=${currentFilter}`;
    shareLinkInput.value = shareUrl;
  });

  closeShareModal.addEventListener("click", () => {
    shareModal.classList.add("hidden");
    shareLinkBox.classList.add("hidden");
  });

  shareEmailBtn.addEventListener("click", () => {
    const subject = encodeURIComponent(`Check out this artwork: ${currentArtwork.title}`);
    const body = encodeURIComponent(`I wanted to share this artwork with you from ColorConnect:\n\n${currentArtwork.title} by ${currentArtwork.artist}\n\nView it here: https://colorconnect.example.com/share?id=${currentArtwork.id}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });

  shareFacebookBtn.addEventListener("click", () => {
    const url = encodeURIComponent(`https://colorconnect.example.com/share?id=${currentArtwork.id}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  });

  shareTwitterBtn.addEventListener("click", () => {
    const text = encodeURIComponent(`Check out "${currentArtwork.title}" by ${currentArtwork.artist} on ColorConnect`);
    const url = encodeURIComponent(`https://colorconnect.example.com/share?id=${currentArtwork.id}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  });

  shareLinkBtn.addEventListener("click", () => {
    shareLinkBox.classList.remove("hidden");
  });

  copyLinkBtn.addEventListener("click", () => {
    shareLinkInput.select();
    document.execCommand('copy');
    copyConfirm.classList.remove("hidden");
    setTimeout(() => {
      copyConfirm.classList.add("hidden");
    }, 2000);
  });

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === artworkModal) {
      artworkModal.classList.add("hidden");
    }
    if (e.target === shareModal) {
      shareModal.classList.add("hidden");
    }
  });
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
}