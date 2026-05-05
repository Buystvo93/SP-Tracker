const DATA_URL = "data/profiles.json"; 
// later replace with GitHub raw link

let profiles = [];

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    profiles = data;
    loadProfiles();
  });

function loadProfiles() {
  const select = document.getElementById("profileSelect");

  profiles.forEach((p, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = p.username;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    renderProfile(select.value);
  });

  renderProfile(0);
}

function renderProfile(index) {
  const p = profiles[index];

  document.getElementById("username").textContent = p.username;
  document.getElementById("level").textContent = p.level;

  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = "";

  for (let stat in p.stats) {
    const value = p.stats[stat];

    const statEl = document.createElement("div");
    statEl.className = "stat";

    statEl.innerHTML = `
      <p>${stat}: ${value}%</p>
      <div class="bar">
        <div class="fill" style="width:${value}%"></div>
      </div>
    `;

    statsDiv.appendChild(statEl);
  }
}
