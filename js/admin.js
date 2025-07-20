import { auth, db } from "./firebase-config.js";

const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminMsg = document.getElementById("adminMsg");
const adminControls = document.getElementById("adminControls");

// بيانات الإداري (يمكنك تغييرها لاحقًا)
const ADMIN_EMAIL = "admin@k-gang.live";
const ADMIN_PASS  = "Admin@1234"; // غيّرها لاحقًا

adminLoginBtn.onclick = async () => {
  const email = document.getElementById("adminEmail").value;
  const pass  = document.getElementById("adminPass").value;
  try {
    await auth.signInWithEmailAndPassword(email, pass);
    adminMsg.textContent = "تم الدخول بنجاح";
    adminControls.style.display = "block";
    loadControls();
  } catch (e) {
    adminMsg.textContent = "بيانات خاطئة";
  }
};

function loadControls() {
  // تحكم KG
  document.getElementById("addCoinsBtn").onclick = async () => {
    const email = document.getElementById("userMail").value;
    const amount = +document.getElementById("amount").value;
    const snap = await db.collection("users").where("email", "==", email).get();
    if (snap.empty) return alert("المستخدم غير موجود");
    const id = snap.docs[0].id;
    await db.collection("users").doc(id).update({ coins: firebase.firestore.FieldValue.increment(amount) });
    alert("تم التحديث");
  };

  // إدارة المتجر
  document.getElementById("addItemBtn").onclick = async () => {
    const name  = document.getElementById("itemName").value;
    const price = +document.getElementById("itemPrice").value;
    const img   = document.getElementById("itemImg").value || "";
    await db.collection("storeItems").add({ name, price, img });
    alert("تم الإضافة");
  };

  // تفعيل/إيقاف لعبة
  const gameSelect = document.getElementById("gameSelect");
  ["clickspeed","roulette","snake","trivia","spin"].forEach(g => {
    const opt = document.createElement("option");
    opt.value = g; opt.textContent = g;
    gameSelect.appendChild(opt);
  });
  document.getElementById("toggleGameBtn").onclick = async () => {
    const game = gameSelect.value;
    const doc = await db.collection("games").doc(game).get();
    const state = doc.exists ? doc.data().disabled : false;
    await db.collection("games").doc(game).set({ disabled: !state }, { merge: true });
    alert(`Game ${game} ${!state ? "disabled" : "enabled"}`);
  };

  // إشعار جماعي
  document.getElementById("sendGlobalBtn").onclick = async () => {
    const msg = document.getElementById("globalMsg").value;
    await db.collection("notifications").add({ message: msg, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    alert("تم الإرسال");
  };
}
