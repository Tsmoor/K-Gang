import { $, LS, toast } from "./utils.js";
let player = LS.get("player", { coins: 100, avatars: [] });

const items = [
  { id: "gold", name: "Gold Avatar", price: 200, img: "assets/avatars/gold.png" },
  { id: "fire", name: "Fire Frame", price: 300 },
  { id: "vip", name: "VIP Pass", price: 1000 },
];
const container = $("#storeItems");
items.forEach((it) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${it.name}</h3>
    <p>${it.price} KG</p>
    <button class="btn buy" data-id="${it.id}" data-price="${it.price}">Buy</button>
  `;
  container.appendChild(div);
});
container.onclick = (e) => {
  if (!e.target.classList.contains("buy")) return;
  const { id, price } = e.target.dataset;
  if (player.coins < +price) return toast("Not enough KG");
  player.coins -= +price;
  if (!player.avatars.includes(id)) player.avatars.push(id);
  LS.set("player", player);
  toast("Purchased!");
  updateCoins();
};

function updateCoins() {
  $("#coins").textContent = player.coins + " KG";
  $("#balance").textContent = player.coins + " KG";
}
