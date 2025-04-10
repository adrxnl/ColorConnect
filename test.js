const numButtons = document.querySelectorAll(".num-btn");
const nothingButton = document.getElementById("nothing-btn");
const plateImage = document.getElementById("plate-image");
const statusMessage = document.getElementById("status-message");

let currentQuestion = 0;
let userResponses = [];
let correctAnswers = ['7','2','9','4','8','2','8','5','8','2','5','7','7','1','1','3','6','6','4','6','2','2','9','1','8','1','1']; 
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
        if ((currentQuestion) % 3 === 0) {
            redSensitivity -= 11.11; 
        } else if ((currentQuestion) % 3 === 1) {
            greenSensitivity -= 11.11; 
        } else {
            blueSensitivity -= 11.11;
        }
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

function showResults() {
    let colorBlindnessType = determineColorBlindnessType();
    
    statusMessage.textContent = `Test Complete! Color Blindness Type: ${colorBlindnessType}`;
    
    let resultMessage = `
        <p>Red Sensitivity: ${redSensitivity.toFixed(2)}%</p>
        <p>Green Sensitivity: ${greenSensitivity.toFixed(2)}%</p>
        <p>Blue Sensitivity: ${blueSensitivity.toFixed(2)}%</p>
        <p>Color Blindness Type: ${colorBlindnessType}</p>
    `;
    
    // Store color blindness type in localStorage
    localStorage.setItem('colorBlindnessType', colorBlindnessType);
    
    // Append results message
    const resultContainer = document.createElement('div');
    resultContainer.innerHTML = resultMessage;
    document.querySelector('.main-content').appendChild(resultContainer);
    
    // Hide test UI elements
    plateImage.style.display = "none";
    document.getElementById("number-pad").style.display = "none";
    nothingButton.style.display = "none";
}

function determineColorBlindnessType() {
    // Simple classification based on sensitivity
    if (redSensitivity < 50) return 'protanopia';
    if (greenSensitivity < 50) return 'deuteranopia';
    if (blueSensitivity < 50) return 'tritanopia';
    
    return 'normal'; // No color blindness detected
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
}