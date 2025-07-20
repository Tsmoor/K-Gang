import { auth, db } from "./firebase-config.js";

const loginBtn  = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName  = document.getElementById("userName");
const coinsEl   = document.getElementById("coins");

auth.onAuthStateChanged(async user => {
  if (user) {
    const ref = db.collection("users").doc(user.uid);
    const doc = await ref.get();
    if (!doc.exists) await ref.set({ coins: 100, avatars: [], frames: [], vip: false });
    const data = doc.data();
    userName.textContent = user.displayName || "Guest";
    coinsEl.textContent = data.coins + " KG";
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    userName.textContent = "";
    coinsEl.textContent = "0 KG";
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
});

loginBtn.onclick  = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
logoutBtn.onclick = () => auth.signOut();
