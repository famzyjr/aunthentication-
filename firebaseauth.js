import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDL-OPSvHyD2gsypGmcW1h5f6rqKBQufwg",
  authDomain: "learing-cbbcb.firebaseapp.com",
  projectId: "learing-cbbcb",
  storageBucket: "learing-cbbcb.firebasestorage.app",
  messagingSenderId: "760123284875",
  appId: "1:760123284875:web:96d408ac432a92ea54638e",
  measurementId: "G-Q6J17D8KYD"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ShowMessage helper
const ShowMessage = (message, divId) => {
  let messageDiv = document.getElementById(divId);
  messageDiv.style.display = 'block';
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
};

// Signup
const signUP = document.getElementById('submitSignUp');
signUP.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstname = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user data in Firestore
      const userData = { email, firstname, lastName };
      const docRef = doc(db, "users", user.uid);

      return setDoc(docRef, userData);
    })
    .then(() => {
      ShowMessage("Account Created Successfully", "signUpMessage");
      window.location.href = "index.html"; // redirect
    })
    .catch((error) => {
      console.error("Error:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        ShowMessage("Email Address Already Exists !!!", "signUpMessage");
      } else {
        ShowMessage("Unable to create User", "signUpMessage");
      }
    });
});
