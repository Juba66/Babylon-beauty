
export async function loadLanguage(lang) {
  const res = await fetch(`./lang/${lang}.json`);
  const dict = await res.json();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
  });
  localStorage.setItem("lang", lang);
}

export function setupLanguageSwitcher() {
  const lang = localStorage.getItem("lang") || "ar";
  loadLanguage(lang);
  document.getElementById("lang-switcher").value = lang;
  document.getElementById("lang-switcher").addEventListener("change", e => {
    loadLanguage(e.target.value);
  });
}
