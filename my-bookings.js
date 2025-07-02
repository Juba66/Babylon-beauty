
// my-bookings.js
import { auth, db } from './firebase.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const bookingsList = document.getElementById("bookings-list");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      bookingsList.innerHTML = "<p>لا توجد حجوزات حتى الآن.</p>";
    } else {
      let html = "<ul>";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        html += `<li>
          <strong>الخدمة:</strong> ${data.service}<br/>
          <strong>التاريخ:</strong> ${data.date}<br/>
          <strong>الاسم:</strong> ${data.name}<br/>
          <strong>تم الحجز:</strong> ${data.createdAt?.toDate().toLocaleString() || "—"}
        </li><hr/>`;
      });
      html += "</ul>";
      bookingsList.innerHTML = html;
    }
  } else {
    bookingsList.innerHTML = "<p style='color:red;'>يجب تسجيل الدخول لعرض الحجوزات.</p>";
  }
});
