import { db } from "./firebase-config.js";

const listEl = document.getElementById("leaderList");
db.collection("users")
  .orderBy("coins", "desc")
  .limit(10)
  .onSnapshot(snap => {
    listEl.innerHTML = "";
    snap.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = `${doc.data().displayName || "Guest"} – ${doc.data().coins} KG`;
      listEl.appendChild(li);
    });
  });
