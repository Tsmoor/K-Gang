function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.className = "fixed top-4 right-4 bg-orange-500 text-white p-3 rounded shadow";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}
window.toast = toast;

db.collection("notifications").onSnapshot(snap => {
  snap.docChanges().forEach(change => {
    if (change.type === "added") toast(change.doc.data().message);
  });
});
