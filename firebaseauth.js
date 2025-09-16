 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  import  {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from  'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
  import {getFirestore,setDoc, doc} from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
  const firebaseConfig = {
    apiKey:'AIzaSyDL-OPSvHyD2gsypGmcW1h5f6rqKBQufwg',
    authDomain: "learing-cbbcb.firebaseapp.com",
    projectId: "learing-cbbcb",
    storageBucket: "learing-cbbcb.firebasestorage.app",
    messagingSenderId: "760123284875",
    appId: "1:760123284875:web:96d408ac432a92ea54638e",
    measurementId: "G-Q6J17D8KYD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)
  const db = getFirestore(app)
const ShowMessage=(message, divId)=>{
let messageDiv  = document.getElementById(divId);
messageDiv.style.display = 'block';
messageDiv.innerHTML = message;
messageDiv.style.opacity = 1;
setTimeout(function(){
  messageDiv.style.opacity = 0;
},5000);
}

const signUP = document.getElementById('submitSignUp')
signUP.addEventListener('click',function(e){
  e.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstname = document.getElementById('fName').value;
  const lastName  = document.getElementById('lName').value;

 createUserWithEmailAndPassword(auth, email, password)
.then((userCredentaial)=>{
  const user = userCredentaial.user;
  // save user data in firestore
  const userData = {email, firstname , lastName};
  const docRef = doc(db, 'users', user.uid);

  return setDoc(docRef, userData);
})
.then(()=>{
  ShowMessage('Account Created Successfully', 'signUpMessage');
  window.location.href = 'index.html';
})
.catch((error)=>{
console.error('Error:', error.code, error.message);
if(error.code === 'auth/email-already-in-use'){
ShowMessage('Email address Already Exists !!!', 'signUpMessage');
}else{
  ShowMessage('Unable to create user', 'signUpMessage')
}
});

  })

  const signIn  = document.getElementById('submitSignIn');
  signIn.addEventListener('click',(e)=>{
   e.preventDefault();
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const auth = getAuth(app);
   signInWithEmailAndPassword(auth, email, password)
   .then((userCredentaial)=>{
    ShowMessage('login is successful','signInMessage');
    const user = userCredentaial.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href = 'Homepage.html'
   })
   .catch((error)=>{
    const errorCode = error.code;
    if(errorCode === 'auth/invalid-credential'){
     ShowMessage('Incorrect Email or Password', 'signInMessage')
    }
    else{
      ShowMessage('Account does not Exit', 'signInMessage');

    }
   })
  })

