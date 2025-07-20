import { auth, db } from "./firebase-config.js";

const storeItems = [
  { id: "gold", name: "Gold Avatar", price: 200, type: "avatars" },
  { id: "fire", name: "Fire Frame", price: 300, type: "frames" },
  { id: "vip", name: "VIP Pass", price: 1000, type: "vip" }
];
const storeEl = document.getElementById("storeItems");

storeItems.forEach(it => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${it.name}</h3>
    <p>${it.price} KG</p>
    <button class="btn buy" data-id="${it.id}" data-type="${it.type}" data-price="${it.price}">Buy</button>
  `;
  storeEl.appendChild(div);
});

storeEl.onclick = async (e) => {
  if (!e.target.classList.contains("buy")) return;
  const { id, type, price } = e.target.dataset;
  const uid = auth.currentUser.uid;
  const userRef = db.collection("users").doc(uid);
  const user = await userRef.get();
  if (user.data().coins < +price) return alert("Not enough KG!");
  const field = type === "vip" ? "vip" : `${type}`;
  const update = { coins: firebase.firestore.FieldValue.increment(-price) };
  if (type === "vip") update.vip = true;
  else update[field] = firebase.firestore.FieldValue.arrayUnion(id);
  await userRef.update(update);
  alert("Purchased!");
};
