
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
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

const form = document.getElementById("reviewForm");
const msg = document.getElementById("message");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    msg.innerText = "يرجى تسجيل الدخول أولاً لإرسال تقييم.";
    form.style.display = "none";
  } else {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;

      try {
        await addDoc(collection(db, "reviews"), {
          userId: user.uid,
          rating: parseInt(rating),
          comment,
          createdAt: serverTimestamp()
        });
        msg.innerText = "تم إرسال التقييم بنجاح. شكراً لك!";
        form.reset();
      } catch (error) {
        msg.innerText = "حدث خطأ أثناء إرسال التقييم.";
      }
    });
  }
});
