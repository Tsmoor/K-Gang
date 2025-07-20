function route() {
  const hash = location.hash.slice(1) || "dashboard";
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(hash)?.style.display = "block";
}
window.addEventListener("hashchange", route);
window.addEventListener("load", route);

// Dark Mode Toggle
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  const dark = document.getElementById("darkSheet");
  dark.disabled = !dark.disabled;
};
