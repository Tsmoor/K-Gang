import { $, LS, toast } from "./utils.js";

// Player
let player = LS.get("player", { name: "Player", coins: 100, avatars: [], badges: [] });
const save = () => LS.set("player", player);

// DOM
$("#playerName").textContent = player.name;
$("#coins").textContent = player.coins + " KG";
$("#balance").textContent = player.coins + " KG";

// Navigation
window.addEventListener("hashchange", () => {
  $$(".page").forEach((p) => (p.style.display = "none"));
  $(location.hash || "#dashboard").style.display = "block";
});
window.dispatchEvent(new Event("hashchange"));

// Theme
$("#themeToggle").onclick = () => {
  const dark = $("#darkSheet");
  dark.disabled = !dark.disabled;
};
