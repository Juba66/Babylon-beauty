
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
const salonList = document.getElementById("salonList");
const cityFilter = document.getElementById("cityFilter");

const loadSalons = async (city = "") => {
  salonList.innerHTML = "جاري تحميل الصالونات...";
  let q = collection(db, "salons");

  if (city) {
    q = query(q, where("city", "==", city));
  }

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    salonList.innerHTML = "<p>لا توجد صالونات في هذه المدينة.</p>";
    return;
  }

  let html = "<ul>";
  snapshot.forEach((doc) => {
    const data = doc.data();
    html += `<li><strong>${data.name}</strong> - ${data.city}</li>`;
  });
  html += "</ul>";
  salonList.innerHTML = html;
};

cityFilter.addEventListener("change", (e) => {
  loadSalons(e.target.value);
});

loadSalons();
