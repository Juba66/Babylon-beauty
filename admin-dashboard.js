
// admin-dashboard.js
import { db } from './firebase.js';
import {
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// جلب المستخدمين
async function getTotalUsers() {
  const snapshot = await getDocs(collection(db, "users"));
  document.getElementById("totalUsers").textContent = "المستخدمين: " + snapshot.size;
}

// جلب الحجوزات
async function getTotalBookings() {
  const snapshot = await getDocs(collection(db, "bookings"));
  document.getElementById("totalBookings").textContent = "الحجوزات: " + snapshot.size;
}

// جلب الصالونات
async function getTotalSalons() {
  const snapshot = await getDocs(collection(db, "salons"));
  document.getElementById("totalSalons").textContent = "الصالونات: " + snapshot.size;
}

// متوسط التقييم
async function getAverageRating() {
  const snapshot = await getDocs(collection(db, "ratings"));
  let total = 0;
  snapshot.forEach(doc => {
    total += doc.data().rating || 0;
  });
  const avg = snapshot.size ? (total / snapshot.size).toFixed(1) : 0;
  document.getElementById("averageRating").textContent = "متوسط التقييم: " + avg;
}

// تشغيل الكل
getTotalUsers();
getTotalBookings();
getTotalSalons();
getAverageRating();
