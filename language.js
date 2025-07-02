
const langBtn = document.getElementById("langSwitcher");

function switchLanguage(toLang) {
  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.textContent = toLang === "en" ? el.dataset.en : el.dataset.ar;
  });
  langBtn.textContent = toLang === "en" ? "العربية" : "English";
  localStorage.setItem("lang", toLang);
}

langBtn.addEventListener("click", () => {
  const newLang = langBtn.textContent === "English" ? "en" : "ar";
  switchLanguage(newLang);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ar";
  switchLanguage(savedLang);
});
