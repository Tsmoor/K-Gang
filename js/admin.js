const ADMIN_PASS = "1234"; // غيّرها لاحقًا
let unlocked = LS.get("adminUnlocked", false);

$("#loginAdminBtn").onclick = () => {
  if ($("#adminPass").value === ADMIN_PASS) {
    LS.set("adminUnlocked", true);
    unlocked = true;
    $("#adminLogin").style.display = "none";
    $("#adminControls").style.display = "block";
  } else {
    $("#loginMsg").textContent = "Wrong password";
  }
};

if (unlocked) {
  $("#adminLogin").style.display = "none";
  $("#adminControls").style.display = "block";
}

$("#setCoinsBtn").onclick = () => {
  const name = $("#userName").value || "Player";
  const amount = +$("#amount").value;
  let users = LS.get("users", {});
  users[name] = (users[name] || 100) + amount;
  LS.set("users", users);
  toast("Coins updated");
};

$("#addItemBtn").onclick = () => {
  const name = $("#itemName").value;
  const price = +$("#itemPrice").value;
  if (!name || !price) return toast("Fill all");
  let store = LS.get("storeItems", []);
  store.push({ name, price });
  LS.set("storeItems", store);
  toast("Item added");
};

$("#sendGlobalBtn").onclick = () => {
  toast($("#globalMsg").value);
};
