
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const container = document.getElementById("bookingsContainer");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      container.innerHTML = "<p>لا توجد حجوزات حتى الآن.</p>";
    } else {
      let html = "<ul>";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        html += `<li>
          <strong>${data.name}</strong> - ${data.service}<br>
          ${data.date} ${data.time}
        </li>`;
      });
      html += "</ul>";
      container.innerHTML = html;
    }
  } else {
    container.innerHTML = "<p>يرجى تسجيل الدخول أولاً لعرض حجوزاتك.</p>";
  }
});
