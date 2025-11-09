const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/matches"
    : "https://your-backend-domain/matches"; // e.g. Render or EC2 URL

async function loadMatches() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list = document.getElementById("matches");
    list.innerHTML = "";
    data.forEach(match => {
      const li = document.createElement("li");
      li.textContent = `${match.home} vs ${match.away} — ${match.score}`;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById("matches").textContent = "⚠️ Failed to load data.";
    console.error("Fetch error:", err);
  }
}
loadMatches();
