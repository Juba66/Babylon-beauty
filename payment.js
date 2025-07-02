
document.getElementById("paymentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const message = document.getElementById("message");
  message.innerHTML = "جاري تنفيذ الدفع...";

  setTimeout(() => {
    message.innerHTML = "✅ تم الدفع بنجاح!";
    localStorage.setItem("paymentStatus", "تم الدفع");
    setTimeout(() => {
      window.location.href = "receipt.html";
    }, 2000);
  }, 1500);
});
