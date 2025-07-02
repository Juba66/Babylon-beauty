
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

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docRef = await addDoc(collection(db, "bookings"), {
          userId: user.uid,
        paymentMethod: payment,
          name,
          service,
          date,
          createdAt: serverTimestamp()
        });

        const payment = document.getElementById("payment").value;
    const bookingData = {
          name,
          service,
          date,
          id: docRef.id,
          createdAt: new Date().toISOString()
        };

        localStorage.setItem("lastBooking", JSON.stringify(bookingData));
        window.location.href = "receipt.html";
      } catch (error) {
        alert("حدث خطأ: " + error.message);
      }
    } else {
      alert("يجب تسجيل الدخول أولاً.");
    }
  });
});
