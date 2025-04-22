// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

const numButtons = document.querySelectorAll(".num-btn");
const nothingButton = document.getElementById("nothing-btn");
const plateImage = document.getElementById("plate-image");
const statusMessage = document.getElementById("status-message");

let currentQuestion = 0;
let userResponses = [];
let redSensitivity = 100;
let greenSensitivity = 100;
let blueSensitivity = 100;

const plates = [
  { image: "redPlate1Eas.png", correctAnswer: '7' }, 
  { image: "greenPlate1Eas.png", correctAnswer: '2' }, 
  { image: "bluePlate1Eas.png", correctAnswer: '9' },
  { image: "redPlate2Eas.png", correctAnswer: '4' }, 
  { image: "greenPlate2Eas.png", correctAnswer: '8' }, 
  { image: "bluePlate2Eas.png", correctAnswer: '2' },  
  { image: "redPlate3Eas.png", correctAnswer: '8' }, 
  { image: "greenPlate3Eas.png", correctAnswer: '5' }, 
  { image: "bluePlate3Eas.png", correctAnswer: '8' },
  { image: "redPlate1Med.png", correctAnswer: '2' }, 
  { image: "greenPlate1Med.png", correctAnswer: '5' }, 
  { image: "bluePlate1Med.png", correctAnswer: '7' }, 
  { image: "redPlate2Med.png", correctAnswer: '7' }, 
  { image: "greenPlate2Med.png", correctAnswer: '1' }, 
  { image: "bluePlate2Med.png", correctAnswer: '1' },  
  { image: "redPlate3Med.png", correctAnswer: '3' }, 
  { image: "greenPlate3Med.png", correctAnswer: '6' }, 
  { image: "bluePlate3Med.png", correctAnswer: '6' }, 
  { image: "redPlate1Har.png", correctAnswer: '4' }, 
  { image: "greenPlate1Har.png", correctAnswer: '6' }, 
  { image: "bluePlate1Har.png", correctAnswer: '2' }, 
  { image: "redPlate2Har.png", correctAnswer: '2' }, 
  { image: "greenPlate2Har.png", correctAnswer: '9' }, 
  { image: "bluePlate2Har.png", correctAnswer: '1' },  
  { image: "redPlate3Har.png", correctAnswer: '8' }, 
  { image: "greenPlate3Har.png", correctAnswer: '1' }, 
  { image: "bluePlate3Har.png", correctAnswer: '1' }  
];

function loadNextQuestion() {
  let currentPlate = plates[currentQuestion];

  if (userResponses[currentQuestion] !== currentPlate.correctAnswer) {
    if (currentQuestion % 3 === 0) redSensitivity -= 11.11;
    else if (currentQuestion % 3 === 1) greenSensitivity -= 11.11;
    else blueSensitivity -= 11.11;
  }

  currentQuestion++;

  if (currentQuestion < plates.length) {
    plateImage.src = `plates/${plates[currentQuestion].image}`;
  } else {
    showResults();
  }
}

numButtons.forEach(button => {
  button.addEventListener("click", () => {
    let value = button.getAttribute("data-value");
    userResponses.push(value);
    loadNextQuestion();
  });
});

nothingButton.addEventListener("click", () => {
  userResponses.push("Nothing");
  loadNextQuestion();
});

async function showResults() {
  let colorBlindnessType = determineColorBlindnessType();
  statusMessage.textContent = `Test Complete! Color Blindness Type: ${colorBlindnessType}`;

  let resultMessage = `
    <p>Red Sensitivity: ${redSensitivity.toFixed(2)}%</p>
    <p>Green Sensitivity: ${greenSensitivity.toFixed(2)}%</p>
    <p>Blue Sensitivity: ${blueSensitivity.toFixed(2)}%</p>
    <p>Color Blindness Type: ${colorBlindnessType}</p>
  `;

  const user = auth.currentUser;
  if (user) {
    try {
      await update(ref(db, `users/${user.uid}`), {
        colorblindnessType: colorBlindnessType
      });
      console.log("✅ Updated colorblindnessType in Firebase");
    } catch (err) {
      console.error("❌ Failed to update Firebase:", err);
    }
  }

  const resultContainer = document.createElement('div');
  resultContainer.innerHTML = resultMessage;
  document.body.appendChild(resultContainer);

  plateImage.style.display = "none";
  document.getElementById("number-pad").style.display = "none";
  nothingButton.style.display = "none";
}

function determineColorBlindnessType() {
  if (redSensitivity < 50) return 'protanopia';
  if (greenSensitivity < 50) return 'deuteranopia';
  if (blueSensitivity < 50) return 'tritanopia';
  return 'normal';
}

// Make toggleSidebar globally accessible
window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
  };
  