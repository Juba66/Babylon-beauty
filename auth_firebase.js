
// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyAWB3LNZvlR4YCr_f1t3iE97-jMhx38Ac0",
  authDomain: "babylon-beauty.firebaseapp.com",
  projectId: "babylon-beauty",
  storageBucket: "babylon-beauty.appspot.com",
  messagingSenderId: "741891084943",
  appId: "1:741891084943:web:4d411b385c50dd2acf16fa",
  measurementId: "G-Z1LWK7RWH3"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// زر التسجيل
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("تم إنشاء الحساب بنجاح");
    })
    .catch((error) => {
      alert("خطأ: " + error.message);
    });
});

// زر الدخول
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("تم تسجيل الدخول بنجاح");
      window.location.href = "salons.html";
    })
    .catch((error) => {
      alert("خطأ: " + error.message);
    });
});
