import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getFirestore, getDoc, doc } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
const iconElement = document.getElementById('loggedUserEmail');
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

onAuthStateChanged(auth, (user) => {
  const LoggedInUserId = localStorage.getItem('loggedInUserId');
  if (LoggedInUserId) {
    const docRef = doc(db, 'users', LoggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('loggedUserfName').innerText = userData.firstname;
          iconElement.innerText = userData.email.charAt(0).toUpperCase();
          document.getElementById('loggedUserLName').innerText = userData.lastName;
          // document.getElementById('loggedUserEmail').innerText =userData.;
        } else {
          console.log('no document found match ID ');
        }
      }).catch((error) => {
        console.log('Error getting document');
      })
  } else {
    console.log('User ID not Found in LocalStorage');
  }
})
const logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error Signing out:', error);

    })
})

document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-item a');
  const currentPage = window.location.pathname.split("/").pop();

  navItems.forEach(item => {
    // Highlight active link based on current page
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }


  });
});

function updateProgressBar(percentage) {
  const progressBar = document.querySelectorAll('#myProgressBar');
  progressBar.forEach(item =>{
     item.style.width = percentage + '%';
  item.textContent = percentage + '%';
  })
  // Optional: display percentage text
}

// Example usage:
// Simulate progress over time
let currentProgress = 0;
const interval = setInterval(() => {
  if (currentProgress >= 100) {
    clearInterval(interval);
  } else {
    currentProgress += 10; // Increment progress
    updateProgressBar(currentProgress);
  }
}, 500); // Update every 0.5 seconds

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['2025-01-27', '2025-02-28', '2025-03-29', '2025-04-30', '2025-05-1', '2025-02-11',],
    datasets: [{
      label: 'Portfolio',
      data: [100, 200, 300, 400, 500, 600, 700, 800],
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false  // 🚫 hides the legend
      }
    },
    layout: {
      
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index) {
            const customLabels = ['$1,800', '$11,600', '$11,400', '$11,200', '$11,000', '$10,800', '$10,600', '$10,400', '$10,200', '$10,000', '$9,800'];
            return customLabels[index] || value;
          }
        },

      }
    }
  }
});


const ct = document.getElementById('myCharts');

new Chart(ct, {
  type: 'doughnut',
  data: {
    labels: ['2025-01-27', '2025-02-28', '2025-03-29', '2025-04-30', '2025-05-1', '2025-02-11',],
    datasets: [{
      label: 'Portfolio',
      data: [100, 200, 300, 400, 500, 600, 700, 800],
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false  // 🚫 hides the legend
      }
    },
    layout: {
  
    },
    
    scales: {
        x: {
          display: false,  // ❌ hide X axis numbers and lines
          grid: { drawBorder: false, drawTicks: false, display: false }
        },
        y: {
          display: false,  // ❌ hide Y axis numbers and lines
          grid: { drawBorder: false, drawTicks: false, display: false }
        }
      }
  }
});


