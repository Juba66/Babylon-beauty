
// booking.js
import { auth, db } from './firebase.js';
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// إخفاء التحذير إذا كان المستخدم مسجلًا الدخول
onAuthStateChanged(auth, (user) => {
  if (user && document.getElementById("auth-warning")) {
    document.getElementById("auth-warning").style.display = "none";
  }
});

document.getElementById("booking-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name,
        service,
        date,
        createdAt: serverTimestamp()
      })
      .then(() => {
        alert("تم إرسال الحجز بنجاح!");
        document.getElementById("booking-form").reset();
      })
      .catch((error) => {
        alert("حدث خطأ: " + error.message);
      });
    } else {
      alert("يجب تسجيل الدخول أولاً.");
    }
  });
});
