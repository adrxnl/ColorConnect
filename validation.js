// validation.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBp2YridCWSaVd66UUbRkkRbAscINS7HjU",
  authDomain: "colorconnect-f850c.firebaseapp.com",
  projectId: "colorconnect-f850c",
  storageBucket: "colorconnect-f850c.appspot.com",
  messagingSenderId: "937372901345",
  appId: "1:937372901345:web:e57c1c80094871b2923ca0",
  databaseURL: "https://colorconnect-f850c-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

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
      const colorblindnessType = document.getElementById("colorblind-select")?.value || "none";

      if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(db, 'users/' + user.uid), {
            username,
            email,
            colorblindnessType,
            createdAt: new Date().toISOString()
          })
          .then(() => {
            alert("Signup successful!");
            window.location.href = "LogIn.html";
          })
          .catch((error) => {
            errorMessage.textContent = "Failed to save user data: " + error.message;
          });
        })
        .catch((error) => {
          errorMessage.textContent = "Signup failed: " + error.message;
        });
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          get(ref(db, 'users/' + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              localStorage.setItem('colorBlindnessType', userData.colorblindnessType || 'none');
              alert(`Login successful`);
              window.location.href = "test.html";
            } else {
              errorMessage.textContent = "User data not found!";
            }
          }).catch((error) => {
            errorMessage.textContent = "Error retrieving user data: " + error.message;
          });
        })
        .catch((error) => {
          errorMessage.textContent = "Invalid email or password.";
        });
    });
  }
});