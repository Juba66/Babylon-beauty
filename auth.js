
// auth.js
import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.getElementById("signup-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("تم إنشاء الحساب بنجاح"))
    .catch(err => alert("خطأ: " + err.message));
});

document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("تم تسجيل الدخول!");
      window.location.href = "salons.html";
    })
    .catch(err => alert("خطأ: " + err.message));
});
