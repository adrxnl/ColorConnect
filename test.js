const numButtons = document.querySelectorAll(".num-btn");
const nothingButton = document.getElementById("nothing-btn");
const plateImage = document.getElementById("plate-image");
const statusMessage = document.getElementById("status-message");

let currentQuestion = 0;
let userResponses = [];
let correctAnswers = ['2','4','2','5','7','7','1','1','3','6','6']; // Correct answers for plates 1, 2, 3, 4
let redSensitivity = 100;
let greenSensitivity = 100;
let blueSensitivity = 100;

// Update this with the correct answers for each plate
const plates = [
    { image: "screeningPlate1.png", correctAnswer: '2' }, 
    { image: "screeningPlate2.png", correctAnswer: '4' }, 
    { image: "redPlate1Med.png", correctAnswer: '2' }, 
    { image: "greenPlate1Med.png", correctAnswer: '5' }, 
    { image: "bluePlate1Med.png", correctAnswer: '7' }, 
    { image: "redPlate2Med.png", correctAnswer: '7' }, 
    { image: "greenPlate2Med.png", correctAnswer: '1' }, 
    { image: "bluePlate2Med.png", correctAnswer: '1' },  
    { image: "redPlate3Med.png", correctAnswer: '3' }, 
    { image: "greenPlate3Med.png", correctAnswer: '6' }, 
    { image: "bluePlate3Med.png", correctAnswer: '6' }  
];

function loadNextQuestion() {
    // Compare the answer with the correct answer
    let currentPlate = plates[currentQuestion];

    if (userResponses[currentQuestion] !== currentPlate.correctAnswer) {
        if(currentQuestion === 0 || currentQuestion === 1){
            endExam();
        }
        else{
            if ((currentQuestion - 2) % 3 === 0) {
                redSensitivity -= 12.5; 
            } else if ((currentQuestion - 2) % 3 === 1) {
                greenSensitivity -= 12.5; 
            } else {
                blueSensitivity -= 12.5;
            }
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
        userResponses.push(value); // Save the answer
        loadNextQuestion();
    });
});

nothingButton.addEventListener("click", () => {
    userResponses.push("Nothing"); // Save "Nothing" as the answer
    loadNextQuestion();
});

function showResults() {
    statusMessage.textContent = `Test Complete! Your responses: ${userResponses.join(", ")}`;
    
    // Display results of deficiencies
    let resultMessage = `
        <p>Red Sensitivity: ${redSensitivity}%</p>
        <p>Green Sensitivity: ${greenSensitivity}%</p>
        <p>Blue Sensitivity: ${blueSensitivity}%</p>
    `;
    
    // Append results message
    const resultContainer = document.createElement('div');
    resultContainer.innerHTML = resultMessage;
    document.body.appendChild(resultContainer);
    
    // Hide test UI elements
    plateImage.style.display = "none";
    document.getElementById("number-pad").style.display = "none";
    nothingButton.style.display = "none";
}

function endExam(){
    statusMessage.textContent = `Severe Red-Green Colorblindness detected. We recommend seeking professional help.`;
    plateImage.style.display = "none";
    document.getElementById("number-pad").style.display = "none";
    nothingButton.style.display = "none";
}