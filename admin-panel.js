
import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// إضافة صالون جديد
export async function addSalon() {
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const services = document.getElementById("services").value.split(",");

  if (!name || !city || services.length === 0) {
    alert("يرجى إدخال جميع الحقول.");
    return;
  }

  await addDoc(collection(db, "salons"), {
    name,
    city,
    services
  });

  alert("✅ تم إضافة الصالون.");
  loadSalons();
}

// عرض الصالونات
async function loadSalons() {
  const list = document.getElementById("salonList");
  list.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "salons"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "salon-item";
    div.innerHTML = `<strong>${data.name}</strong> - ${data.city}<br>الخدمات: ${data.services.join(", ")}<br>
      <button onclick="deleteSalon('${docSnap.id}')">🗑️ حذف</button>`;
    list.appendChild(div);
  });
}

window.addSalon = addSalon;

window.deleteSalon = async function(id) {
  await deleteDoc(doc(db, "salons", id));
  alert("❌ تم حذف الصالون.");
  loadSalons();
};

loadSalons();

// إدارة الحجوزات
async function loadBookings() {
  const list = document.getElementById("bookingList");
  list.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "bookings"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "salon-item";
    div.innerHTML = `
      <strong>الاسم:</strong> ${data.name || "مستخدم"}<br>
      <strong>الخدمة:</strong> ${data.service}<br>
      <strong>التاريخ:</strong> ${data.date}<br>
      <strong>الدفع:</strong> ${data.paymentMethod}<br>
      <button onclick="deleteBooking('${docSnap.id}')">🗑️ حذف</button>`;
    list.appendChild(div);
  });
}

window.deleteBooking = async function(id) {
  await deleteDoc(doc(db, "bookings", id));
  alert("❌ تم حذف الحجز.");
  loadBookings();
};

loadBookings();

// إدارة الحجوزات
async function loadBookings() {
  const list = document.getElementById("bookingList");
  list.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "bookings"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "salon-item";
    div.innerHTML = `
      <strong>الاسم:</strong> ${data.name || "مستخدم"}<br>
      <strong>الخدمة:</strong> ${data.service}<br>
      <strong>التاريخ:</strong> ${data.date}<br>
      <strong>الدفع:</strong> ${data.paymentMethod}<br>
      <button onclick="openEditModal('${docSnap.id}', ${JSON.stringify(data).replace(/'/g, "\'")})">✏️ تعديل</button>
      <button onclick="deleteBooking('${docSnap.id}')">🗑️ حذف</button>`;
    list.appendChild(div);
  });
}

// فتح نموذج التعديل وملء البيانات
let currentEditId = null;
window.openEditModal = function(id, data) {
  currentEditId = id;
  document.getElementById("editName").value = data.name || "";
  document.getElementById("editService").value = data.service || "";
  document.getElementById("editDate").value = data.date || "";
  document.getElementById("editPayment").value = data.paymentMethod || "cash";

  document.getElementById("editBookingModal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
};

window.closeEditModal = function() {
  document.getElementById("editBookingModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
};

// حفظ التعديلات إلى Firestore
window.saveEdit = async function() {
  if (!currentEditId) return alert("خطأ: لا يوجد حجز محدد");

  const updatedData = {
    name: document.getElementById("editName").value,
    service: document.getElementById("editService").value,
    date: document.getElementById("editDate").value,
    paymentMethod: document.getElementById("editPayment").value
  };

  try {
    const docRef = doc(db, "bookings", currentEditId);
    await updateDoc(docRef, updatedData);
    alert("✅ تم حفظ التعديلات بنجاح");
    closeEditModal();
    loadBookings();
  } catch (error) {
    alert("خطأ أثناء الحفظ: " + error.message);
  }
};
