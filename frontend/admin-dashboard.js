// Immediately run on page load
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("adminToken");
  const category = localStorage.getItem("category");

  // If token is missing, redirect to login
  if (!token || !category) {
    window.location.href = "/admin-login.html";
    return;
  }

  try {
    // Fetch dashboard data
    const res = await fetch(`/api/admin/dashboard?category=${encodeURIComponent(category)}`, {
      headers: { Authorization: "Bearer " + token }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard");
    }

    const stats = await res.json();
    renderDashboard(stats);

  } catch (err) {
    console.error(err);
    alert("Session expired or network error. Please login again.");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("category");
    window.location.href = "/admin-login.html";
  }
});

// --- Render Dashboard ---
function renderDashboard(stats) {
  // Make sure your HTML has these IDs
  document.getElementById("login-container")?.remove(); // optional if login container exists
  document.getElementById("dashboard-container").style.display = "block";

  // --- Stat Cards ---
  const statsDiv = document.getElementById("stats");
  let statCards = `<div class="stat-card"><div>Total Feedbacks</div><span>${stats.count}</span></div>`;

  if (stats.avg && Object.keys(stats.avg).length) {
    statCards += Object.entries(stats.avg)
      .map(([q, v]) => `
        <div class="stat-card">
          <div>Avg ${q.replace(/([A-Z])/g, " $1")}</div>
          <span>${v ? v.toFixed(2) : "N/A"}</span>
        </div>
      `).join("");
  }

  statCards += `
    <div class="stat-card">
      <div>Avg Sentiment</div>
      <span style="color:${stats.avgSentiment > 0 ? "#1cc88a" : stats.avgSentiment < 0 ? "#e74a3b" : "#858796"}">
        ${stats.avgSentiment.toFixed(2)}
      </span>
    </div>
  `;
  statsDiv.innerHTML = statCards;

  // --- Pie Charts, Tables, Trend Charts ---
  // You can copy your renderDashboard logic here from admin-login.js,
  // but remove any references to hiding login or redirecting.
  const distKeys = Object.keys(stats.dist);
  const questionLabels = {
    teachingQuality: "Teaching Quality",
    communication: "Communication",
    engagement: "Engagement",
    rating: "Rating",
    recommend: "Recommend",
    satisfaction: "Satisfaction",
  };
  distKeys.forEach((key, idx) => {
    if (idx > 2) return;
    const dist = stats.dist[key];
    const labels = Object.keys(dist).map(
      (l) => l.charAt(0).toUpperCase() + l.slice(1).replace("-", " ")
    );
    const data = Object.values(dist);
    const ctx = document
      .getElementById("pieChart" + (idx + 1))
      .getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: questionLabels[key] || key,
            data,
            backgroundColor: [
              "#4e73df",
              "#1cc88a",
              "#36b9cc",
              "#f6c23e",
              "#e74a3b",
              "#858796",
            ],
          },
        ],
      },
      options: { responsive: true, plugins: { legend: { display: true } } },
    });
  });

  // --- Details & Feedback Table ---
  let detailsHTML = distKeys
    .map(
      (key, idx) => `
    <h3>Distribution for ${
      questionLabels[key] || key.replace(/([A-Z])/g, " $1")
    }</h3>
    <ul style="display:flex;justify-content:center;gap:2rem;list-style:none;padding:0;">
      ${Object.keys(stats.dist[key])
        .map(
          (l) =>
            `<li><b>${
              l.charAt(0).toUpperCase() + l.slice(1).replace("-", " ")
            }:</b> ${stats.dist[key][l]}</li>`
        )
        .join("")}
    </ul>`
    )
    .join("");

  detailsHTML += `
    <h3 style="margin-top:2rem;">Recent Feedbacks</h3>
    <table class="recent-table">
      <thead>
        <tr>
          ${Object.keys(stats.feedbacks[0] || {})
            .filter((k) => k !== "_id" && k !== "__v")
            .map((k) => `<th>${k.replace(/([A-Z])/g, " $1")}</th>`)
            .join("")}
          <th>Sentiment</th>
        </tr>
      </thead>
      <tbody>
        ${stats.feedbacks
          .map(
            (fb) =>
              `<tr>${Object.keys(fb)
                .filter((k) => k !== "_id" && k !== "__v")
                .map((k) =>
                  k === "createdAt"
                    ? `<td>${new Date(fb[k]).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</td>`
                    : `<td>${fb[k]}</td>`
                )
                .join("")}<td>${
                fb.suggestionSentiment ??
                fb.commentSentiment ??
                fb.improvementSentiment ??
                ""
              }</td></tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  document.getElementById("details").innerHTML = detailsHTML;

  // --- Sentiment Trend Line Chart ---
  const trendCtx = document
    .getElementById("sentimentTrendChart")
    .getContext("2d");
  new Chart(trendCtx, {
    type: "line",
    data: {
      labels: stats.sentimentTrendLabels,
      datasets: [
        {
          label: "Sentiment Score",
          data: stats.sentimentTrend,
          borderColor: "#4e73df",
          backgroundColor: "rgba(78,115,223,0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#4e73df",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: -5,
          suggestedMax: 5,
          title: { display: true, text: "Sentiment Score" },
        },
      },
    },
    });
}
