const DATA_URL = "data/profiles.json";

let profiles = [];

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    profiles = data;
  });

const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  resultsDiv.innerHTML = "";

  if (!query) return;

  const filtered = profiles.filter(p =>
    p.username.toLowerCase().includes(query)
  );

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "result";
    div.textContent = p.username;

    div.onclick = () => renderProfile(p);

    resultsDiv.appendChild(div);
  });
});

function renderProfile(p) {
  document.getElementById("profile").classList.remove("hidden");

  document.getElementById("username").textContent = p.username;
  document.getElementById("level").textContent = p.level;

  const statsDiv = document.getElementById("stats");
  const totalDiv = document.getElementById("totalProgress");

  statsDiv.innerHTML = "";
  totalDiv.innerHTML = "";

  let total = 0;
  let count = 0;

  for (let stat in p.stats) {
    const value = p.stats[stat];
    total += value;
    count++;

    const el = document.createElement("div");
    el.className = "stat";

    el.innerHTML = `
      <p>${stat} - ${value}%</p>
      <div class="bar">
        <div class="fill" style="width:${value}%"></div>
      </div>
    `;

    statsDiv.appendChild(el);
  }

  const avg = Math.round(total / count);

  totalDiv.innerHTML = `
    <div class="stat totalBar">
      <p>Total Progress - ${avg}%</p>
      <div class="bar">
        <div class="fill totalFill" style="width:${avg}%"></div>
      </div>
    </div>
  `;
}
