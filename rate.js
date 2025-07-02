
// rate.js
import { auth, db } from './firebase.js';
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.getElementById("rating-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      addDoc(collection(db, "ratings"), {
        userId: user.uid,
        rating,
        comment,
        createdAt: serverTimestamp()
      })
      .then(() => {
        alert("شكراً لتقييمك!");
        document.getElementById("rating-form").reset();
      })
      .catch((error) => {
        alert("حدث خطأ: " + error.message);
      });
    } else {
      alert("يجب تسجيل الدخول أولاً.");
    }
  });
});
