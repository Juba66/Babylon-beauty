
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

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

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.initMap = async function () {
  const salonId = getQueryParam("id");
  if (!salonId) return;

  const salonRef = doc(db, "salons", salonId);
  const salonSnap = await getDoc(salonRef);

  if (salonSnap.exists()) {
    const data = salonSnap.data();
    const location = data.location || { lat: 33.3152, lng: 44.3661 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: location,
    });

    new google.maps.Marker({
      position: location,
      map: map,
      title: data.name || "موقع الصالون"
    });

    // عرض البيانات
    document.getElementById("salon-name").textContent = data.name || "";
    document.getElementById("salon-description").textContent = data.description || "";

    const servicesDiv = document.getElementById("services-list");
    servicesDiv.innerHTML = "";

    if (data.services && Array.isArray(data.services)) {
      data.services.forEach(service => {
        const item = document.createElement("div");
        item.className = "service-item";
        item.textContent = `${service.name} - ${service.price} د.ع`;
        servicesDiv.appendChild(item);
      });
    }

  } else {
    console.error("Salon not found");
  }
};
