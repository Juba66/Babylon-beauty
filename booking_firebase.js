
// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAWB3LNZvlR4YCr_f1t3iE97-jMhx38Ac0",
  authDomain: "babylon-beauty.firebaseapp.com",
  projectId: "babylon-beauty",
  storageBucket: "babylon-beauty.appspot.com",
  messagingSenderId: "741891084943",
  appId: "1:741891084943:web:4d411b385c50dd2acf16fa",
  measurementId: "G-Z1LWK7RWH3"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Handle form submission
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await addDoc(collection(db, "bookings"), {
          userId: user.uid,
          name,
          service,
          date,
          time,
          timestamp: new Date()
        });
        alert("تم الحجز بنجاح!");
        document.getElementById("bookingForm").reset();
      } catch (error) {
        alert("حدث خطأ أثناء الحجز: " + error.message);
      }
    } else {
      alert("يجب تسجيل الدخول أولاً.");
    }
  });
});
