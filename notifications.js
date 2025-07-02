
// notifications.js
import { auth, db } from './firebase.js';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const container = document.getElementById("notifications-list");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      container.innerHTML = "<p>لا توجد إشعارات حالياً.</p>";
    } else {
      let html = "<ul>";
      snapshot.forEach(async (docSnap) => {
        const data = docSnap.data();
        html += `<li>
          <strong>${data.message}</strong><br/>
          <em>${data.createdAt?.toDate().toLocaleString() || ""}</em>
        </li><hr/>`;

        // تعيين الإشعار كمقروء
        if (!data.read) {
          await updateDoc(doc(db, "notifications", docSnap.id), { read: true });
        }
      });
      html += "</ul>";
      container.innerHTML = html;
    }
  } else {
    container.innerHTML = "<p style='color:red;'>يجب تسجيل الدخول لعرض الإشعارات.</p>";
  }
});
