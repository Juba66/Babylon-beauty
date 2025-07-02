
// بيانات صالونات وهمية
const salons = [
  { name: "Glamour Beauty", city: "بغداد", service: "شعر", lat: 33.3152, lng: 44.3661 },
  { name: "Elegance Salon", city: "أربيل", service: "مكياج", lat: 36.1911, lng: 44.0092 },
  { name: "Style Zone", city: "بغداد", service: "عناية بالبشرة", lat: 33.31, lng: 44.38 },
  { name: "Luxury Touch", city: "البصرة", service: "شعر", lat: 30.5085, lng: 47.7835 }
];

const resultsDiv = document.getElementById("results");
const citySelect = document.getElementById("city");
const serviceSelect = document.getElementById("service");
const nearbyBtn = document.getElementById("nearby");

function displaySalons(filtered) {
  resultsDiv.innerHTML = "";
  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>لا توجد نتائج.</p>";
    return;
  }
  filtered.forEach(s => {
    const div = document.createElement("div");
    div.className = "salon";
    div.innerHTML = `<strong>${s.name}</strong><br>المدينة: ${s.city}<br>الخدمة: ${s.service}`;
    resultsDiv.appendChild(div);
  });
}

function filterSalons() {
  const city = citySelect.value;
  const service = serviceSelect.value;
  const filtered = salons.filter(s => {
    return (!city || s.city === city) && (!service || s.service === service);
  });
  displaySalons(filtered);
}

citySelect.addEventListener("change", filterSalons);
serviceSelect.addEventListener("change", filterSalons);

nearbyBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("الموقع غير مدعوم في هذا المتصفح.");
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    const nearby = salons.filter(s => {
      const dx = s.lat - latitude;
      const dy = s.lng - longitude;
      return Math.sqrt(dx * dx + dy * dy) < 0.5; // تقريبًا 50 كم
    });
    displaySalons(nearby);
  }, () => {
    alert("لم يتم الحصول على الموقع.");
  });
});

filterSalons(); // العرض المبدئي
