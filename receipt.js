
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("receipt");
  const data = JSON.parse(localStorage.getItem("latestBooking"));

  if (data) {
    container.innerHTML = `
      <p><strong>الاسم:</strong> ${data.name}</p>
      <p><strong>الخدمة:</strong> ${data.service}</p>
      <p><strong>التاريخ:</strong> ${data.date}</p>
      <p><strong>الوقت:</strong> ${data.time}</p>
      <p><strong>تم الحجز بنجاح ✅</strong></p>
    `;
  } else {
    container.innerHTML = "<p>لم يتم العثور على بيانات حجز.</p>";
  }
});
