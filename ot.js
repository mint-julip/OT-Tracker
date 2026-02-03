// ---------------------------
// OT Tracker JS for Apps Script
// ---------------------------

window.addEventListener("load", function () {
  const form = document.getElementById("otForm");

  // Submit OT form
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      houseManager: document.getElementById("houseManager").value,
      employee: document.getElementById("employee").value,
      date: document.getElementById("date").value,
      hours: document.getElementById("hours").value,
      reason: document.getElementById("reason").value
    };

    // Call server-side function to add OT entry
    google.script.run
      .withSuccessHandler(() => {
        alert("OT submitted successfully!");
        form.reset();
        loadOTEntries(); // Refresh table
      })
      .withFailureHandler(err => {
        alert("Error submitting OT: " + err.message);
      })
      .addOTEntry(data);
  });

  // Initial table load
  loadOTEntries();

  // Auto-refresh every 30 seconds
  setInterval(loadOTEntries, 30000);
});

// ---------------------------
// Load OT entries from Sheet
// ---------------------------
function loadOTEntries() {
  google.script.run
    .withSuccessHandler(renderOTTable)
    .withFailureHandler(err => {
      console.error("Error loading OT entries:", err);
    })
    .getOTEntries();
}

// ---------------------------
// Render OT table in HTML
// ---------------------------
function renderOTTable(entries) {
  const tbody = document.querySelector("#otTable tbody");
  tbody.innerHTML = ""; // Clear existing rows

  entries.forEach((entry, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${entry.Timestamp || ""}</td>
      <td>${entry["House Manager"] || ""}</td>
      <td>${entry["Employee(s)"] || ""}</td>
      <td>${entry["OT Date"] || ""}</td>
      <td>${entry["Hours"] || ""}</td>
      <td>${entry["Reason"] || ""}</td>
      <td>${entry["Status"] || ""}</td>
      <td>${entry["Approved By"] || ""}</td>
      <td>${entry["Approved At"] || ""}</td>
    `;

    tbody.appendChild(tr);
  });
}


