// profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  const usernameField = document.getElementById("profile-username");
  const emailField = document.getElementById("profile-email");
  const createdField = document.getElementById("profile-created");
  const typeField = document.getElementById("profile-colorblindness");
  const signOutBtn = document.getElementById("signout-button");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      get(ref(db, 'users/' + uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          usernameField.textContent = data.username || "N/A";
          emailField.textContent = data.email || "N/A";
          createdField.textContent = new Date(data.createdAt).toLocaleDateString() || "N/A";
          typeField.textContent = data.colorblindnessType || "N/A";
        } else {
          console.error("No user data found.");
        }
      }).catch((error) => {
        console.error("Error fetching data: ", error);
      });
    } else {
      window.location.href = "LogIn.html"; // redirect to login if not logged in
    }
  });

  // Sign out logic
  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          window.location.href = "LogIn.html";
        })
        .catch((error) => {
          console.error("Sign out error:", error);
        });
    });
  }
});