let balance = Number(localStorage.getItem("balance")) || 5000;
let savings = Number(localStorage.getItem("savings")) || 2000;
let history = JSON.parse(localStorage.getItem("history")) || [];

/* Load Dashboard */
function loadDashboard() {
  if (document.getElementById("userName")) {
    document.getElementById("userName").innerText =
      localStorage.getItem("user") || "Guest";

    document.getElementById("balance").innerText = balance;
    document.getElementById("savings").innerText = savings;
  }
}
loadDashboard();

/* Deposit Money */
function deposit() {
  let amt = prompt("Enter Deposit Amount:");

  if (amt && amt > 0) {
    balance += Number(amt);

    history.push(`➕ Deposited ₹${amt}`);
    saveData();

    alert("Deposit Successful!");
    location.reload();
  }
}

/* Withdraw Money */
function withdraw() {
  let amt = prompt("Enter Withdraw Amount:");

  if (amt && amt > 0) {
    if (amt > balance) {
      alert("❌ Insufficient Balance!");
      return;
    }

    balance -= Number(amt);

    history.push(`➖ Withdrawn ₹${amt}`);
    saveData();

    alert("Withdrawal Successful!");
    location.reload();
  }
}

/* Save Data */
function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("savings", savings);
  localStorage.setItem("history", JSON.stringify(history));
}

/* Logout */
function logout() {
  alert("Logged Out!");
  window.location.href = "index.html";
}

/* Theme Toggle */
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
showToast("Deposit Successful!");
function loadTransactions() {
  let list = document.getElementById("historyList");
  if (!list) return;

  list.innerHTML = "";
  history.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}
loadTransactions();

function searchTransactions() {
  let query = document.getElementById("searchBox").value.toLowerCase();
  let list = document.getElementById("historyList");

  list.innerHTML = "";

  history
    .filter((t) => t.toLowerCase().includes(query))
    .forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
    });
}
let goal = Number(localStorage.getItem("goal")) || 10000;

function setGoal() {
  let amt = Number(document.getElementById("goalAmount").value);

  if (amt > 0) {
    goal = amt;
    localStorage.setItem("goal", goal);
    showToast("Goal Updated!");
    loadGoal();
  }
}

function loadGoal() {
  if (document.getElementById("goalDisplay")) {
    document.getElementById("goalDisplay").innerText = goal;
    document.getElementById("savingsDisplay").innerText = savings;

    if (savings >= goal) {
      document.getElementById("goalMsg").innerText =
        "🎉 Goal Achieved!";
    } else {
      document.getElementById("goalMsg").innerText =
        `₹${goal - savings} remaining to reach your goal.`;
    }
  }
}
loadGoal();
function drawChart() {
  let canvas = document.getElementById("chartCanvas");
  if (!canvas) return;

  let ctx = canvas.getContext("2d");

  // Fix canvas resolution properly
  canvas.width = 600;
  canvas.height = 300;

  // Sample spending data
  let spendingData = [2000, 1500, 3000, 1000, 2500];
  let months = ["Oct", "Nov", "Dec", "Jan", "Feb"];

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bar settings
  let barWidth = 60;
  let gap = 40;
  let startX = 50;

  // Set bar color (cyan visible on dark bg)
  ctx.fillStyle = "cyan";

  spendingData.forEach((val, i) => {
    let barHeight = val / 15;

    // Draw bars
    ctx.fillRect(
      startX + i * (barWidth + gap),
      canvas.height - barHeight - 50,
      barWidth,
      barHeight
    );

    // Month labels
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(
      months[i],
      startX + i * (barWidth + gap) + 15,
      canvas.height - 20
    );

    // Value labels
    ctx.fillStyle = "cyan";
    ctx.fillText(
      "₹" + val,
      startX + i * (barWidth + gap) + 5,
      canvas.height - barHeight - 60
    );
  });
}

drawChart();
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  let main = document.querySelector(".main");

  sidebar.classList.toggle("closed");
  main.classList.toggle("expanded");
}
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  let main = document.querySelector(".main");

  sidebar.classList.toggle("closed");
  main.classList.toggle("expanded");

  // Save state
  localStorage.setItem(
    "sidebarState",
    sidebar.classList.contains("closed") ? "closed" : "open"
  );
}

/* Load Sidebar State */
window.onload = function () {
  let sidebar = document.getElementById("sidebar");
  let main = document.querySelector(".main");

  if (localStorage.getItem("sidebarState") === "closed") {
    sidebar.classList.add("closed");
    main.classList.add("expanded");
  }
};
