// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase Config (Replace with your actual Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyBp2YridCWSaVd66UUbRkkRbAscINS7HjU",
    authDomain: "colorconnect-f850c.firebaseapp.com",
    projectId: "colorconnect-f850c",
    storageBucket: "colorconnect-f850c.firebasestorage.app",
    messagingSenderId: "937372901345",
    appId: "1:937372901345:web:e57c1c80094871b2923ca0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Handle Signup Form Submission
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("SignupForm");
    const loginForm = document.getElementById("LoginForm");
    const errorMessage = document.getElementById("error-message");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username-input").value;
            const email = document.getElementById("email-input").value;
            const password = document.getElementById("password-input").value;
            const confirmPassword = document.getElementById("confirmpassword-input").value;

            // Validate password match
            if (password !== confirmPassword) {
                errorMessage.textContent = "Passwords do not match!";
                return;
            }

            // Register user with Firebase Authentication
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const userId = user.uid;

                    // Assign a random colorblindness type
                    const colorblindnessType = "none"

                    // Save user info in Firebase Database
                    set(ref(db, 'users/' + userId), {
                        username: username,
                        email: email,
                        colorblindnessType: colorblindnessType,
                        createdAt: new Date().toISOString()
                    });

                    alert(`Signup successful!`);
                    window.location.href = "LogIn.html"; // Redirect to login page
                })
                .catch((error) => {
                    errorMessage.textContent = "Error: " + error.message;
                });
        });
    }

    // Login Form Handling
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email-input").value;
            const password = document.getElementById("password-input").value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const userId = user.uid;
                    window.location.href = "ColorConnect.html"; // Redirect to user dashboard
                    // Retrieve user info from database
                    get(ref(db, 'users/' + userId)).then((snapshot) => {
                        if (snapshot.exists()) {
                            const userData = snapshot.val();
                            alert(`Login successful`);
                            
                        } else {
                            errorMessage.textContent = "User data not found!";
                        }
                    });
                })
                .catch((error) => {
                    errorMessage.textContent = "Invalid email or password. Please try again.";
                });
        });
    }
});

