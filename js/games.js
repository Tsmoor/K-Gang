import { auth, db } from "./firebase-config.js";

// Roulette
function loadRoulette() {
  gameContainer.innerHTML = `
    <h3>Roulette</h3>
    <button id="playRoulette" class="btn">Spin 100 KG</button>
    <p id="rouletteResult"></p>
  `;
  document.getElementById("playRoulette").onclick = async () => {
    const uid = auth.currentUser.uid;
    const user = await db.collection("users").doc(uid).get();
    if (user.data().coins < 100) return alert("Not enough KG");
    await db.collection("users").doc(uid).update({ coins: firebase.firestore.FieldValue.increment(-100) });
    const res = Math.random() < 0.1 ? 1000 : (Math.random() < 0.3 ? 200 : 0);
    await db.collection("users").doc(uid).update({ coins: firebase.firestore.FieldValue.increment(res) });
    document.getElementById("rouletteResult").textContent = res ? `You won ${res} KG!` : "You lost!";
  };
}

// Snake 60s
function loadSnake() {
  gameContainer.innerHTML = `
    <h3>Snake 60s</h3>
    <canvas id="snakeCanvas" width="400" height="400" style="background:#111"></canvas>
    <button id="startSnake" class="btn">Start</button>
  `;
  // كود سريع للـ Snake
  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");
  let snake = [{x:10,y:10}], dir={x:1,y:0}, food={}, score=0, timer;
  function placeFood() { food = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)}; }
  function gameLoop() {
    const head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};
    if (head.x<0||head.x>=20||head.y<0||head.y>=20||snake.some(s=>s.x===head.x&&s.y===head.y)) return endGame();
    snake.unshift(head);
    if (head.x===food.x && head.y===food.y) { score++; placeFood(); } else snake.pop();
    draw();
  }
  function draw() {
    ctx.clearRect(0,0,400,400);
    ctx.fillStyle="#f97316"; ctx.fillRect(food.x*20,food.y*20,20,20);
    ctx.fillStyle="#fff"; snake.forEach(s=>ctx.fillRect(s.x*20,s.y*20,20,20));
  }
  async function endGame() {
    clearInterval(timer);
    const reward = score * 10;
    await db.collection("users").doc(auth.currentUser.uid).update({ coins: firebase.firestore.FieldValue.increment(reward) });
    alert(`Game Over – ${reward} KG`);
  }
  placeFood(); draw();
  document.addEventListener("keydown", e=>{
    if (e.key==="ArrowUp" && dir.y===0) dir={x:0,y:-1};
    if (e.key==="ArrowDown" && dir.y===0) dir={x:0,y:1};
    if (e.key==="ArrowLeft" && dir.x===0) dir={x:-1,y:0};
    if (e.key==="ArrowRight" && dir.x===0) dir={x:1,y:0};
  });
  document.getElementById("startSnake").onclick = () => timer = setInterval(gameLoop, 150);
}

// Trivia
async function loadTrivia() {
  const trivia = [
    { q: "2+2=?", a: ["3","4","5"], correct: 1 },
    { q: "Capital of France?", a: ["Paris","London","Rome"], correct: 0 }
  ];
  const q = trivia[Math.floor(Math.random()*trivia.length)];
  gameContainer.innerHTML = `
    <h3>Trivia</h3>
    <p>${q.q}</p>
    ${q.a.map((ans,i)=>`<button class="triviaOpt" data-correct="${i===q.correct}">${ans}</button>`).join("")}
  `;
  gameContainer.onclick = async (e) => {
    if (!e.target.classList.contains("triviaOpt")) return;
    const correct = e.target.dataset.correct === "true";
    const reward = correct ? 50 : 0;
    await db.collection("users").doc(auth.currentUser.uid).update({ coins: firebase.firestore.FieldValue.increment(reward) });
    alert(correct ? "Correct! +50 KG" : "Wrong!");
  };
}

// Daily Spin
function loadSpin() {
  gameContainer.innerHTML = `<h3>Daily Spin</h3><button id="spinBtn" class="btn">Spin</button><p id="spinResult"></p>`;
  document.getElementById("spinBtn").onclick = async () => {
    const uid = auth.currentUser.uid;
    const today = new Date().toISOString().slice(0,10);
    const spinRef = db.collection("spins").doc(uid);
    const spin = await spinRef.get();
    if (spin.exists && spin.data().date === today) return alert("Already spun today");
    const rewards = [0,10,20,50,100,200,500];
    const reward = rewards[Math.floor(Math.random()*rewards.length)];
    await db.collection("users").doc(uid).update({ coins: firebase.firestore.FieldValue.increment(reward) });
    await spinRef.set({ date: today });
    document.getElementById("spinResult").textContent = `You won ${reward} KG`;
  };
}

export { loadClickSpeed, loadRoulette, loadSnake, loadTrivia, loadSpin };
