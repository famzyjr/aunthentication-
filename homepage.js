import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import  {getAuth, onAuthStateChanged, signOut} from  'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
  import {getFirestore,getDoc, doc} from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js'; 

    const firebaseConfig = {
    apiKey: "AIzaSyDL-OPSvHyD2gsypGmcW1h5f6rqKBQufwg",
    authDomain: "learing-cbbcb.firebaseapp.com",
    projectId: "learing-cbbcb",
    storageBucket: "learing-cbbcb.firebasestorage.app",
    messagingSenderId: "760123284875",
    appId: "1:760123284875:web:96d408ac432a92ea54638e",
    measurementId: "G-Q6J17D8KYD"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app)

  onAuthStateChanged(auth,(user)=>{
    const LoggedInUserId = localStorage.getItem('loggedInUserId');
    if(LoggedInUserId){
      const docRef  = doc(db, 'users', LoggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
       if(docSnap.exists()){
        const userData = docSnap.data();
        document.getElementById('loggedUserfName').innerText=userData.firstname;
        document.getElementById('loggedUserLName').innerText = userData.lastName;
        document.getElementById('loggedUserEmail').innerText =userData.email;
       }else{
        console.log('no document found match ID ');
       }
      }).catch((error)=>{
        console.log('Error getting document');
      })
    }else{
    console.log('User ID not Found in LocalStorage');
    }
  })
const logoutButton  = document.getElementById('logoutButton')
  logoutButton.addEventListener('click',()=>{
localStorage.removeItem('loggedInUserId');
signOut(auth)
 .then(()=>{
    window.location.href = 'index.html';
 })
 .catch((error)=>{
    console.error('Error Signing out:', error);
    
 })
  })