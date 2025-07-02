
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
const list = document.getElementById("bookingList");

async function loadBookings() {
  const querySnapshot = await getDocs(collection(db, "bookings"));
  if (querySnapshot.empty) {
    list.innerHTML = "<p>لا توجد حجوزات حالياً.</p>";
    return;
  }

  let html = "<ul>";
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    html += `<li>
      <strong>${data.name}</strong> - ${data.service} - ${data.date} ${data.time}<br>
      الحالة: ${data.status || "قيد الانتظار"}<br>
      <button onclick="updateStatus('${docSnap.id}', 'مقبول')">قبول</button>
      <button onclick="updateStatus('${docSnap.id}', 'مرفوض')">رفض</button>
    </li><hr>`;
  });
  html += "</ul>";
  list.innerHTML = html;
}

window.updateStatus = async (id, status) => {
  const bookingRef = doc(db, "bookings", id);
  await updateDoc(bookingRef, { status });
  alert("تم تحديث الحالة إلى: " + status);
  loadBookings();
};

loadBookings();
