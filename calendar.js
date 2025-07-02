
// calendar.js
import { auth, db } from './firebase.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'ar',
    height: "auto",
    events: [],
    eventColor: '#378006'
  });
  calendar.render();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const events = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          title: data.service || "موعد",
          start: data.date
        };
      });

      calendar.addEventSource(events);
    } else {
      alert("يجب تسجيل الدخول لعرض التقويم.");
    }
  });
});
