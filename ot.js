// Submit OT form
document.getElementById('otForm').addEventListener('submit', e => {
  e.preventDefault();
  const entry = {
    houseManager: document.getElementById('manager').value,
    employee: document.getElementById('employee').value,
    date: document.getElementById('date').value,
    hours: document.getElementById('hours').value,
    reason: document.getElementById('reason').value,
    status: "Pending",
    approvedBy: "",
    approvedAt: ""
  };

  google.script.run.withSuccessHandler(() => {
    loadOTEntries();
    document.getElementById('otForm').reset();
    alert("OT logged successfully!");
  }).doPost({postData: {contents: JSON.stringify(entry)}});
});

// Load OT entries and populate table
function loadOTEntries() {
  google.script.run.withSuccessHandler(entries => {
    const tbody = document.querySelector('#otTable tbody');
    tbody.innerHTML = '';
    entries.forEach(entry => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = entry.Timestamp || '';
      row.insertCell(1).textContent = entry['House Manager'] || '';
      row.insertCell(2).textContent = entry['Employee(s)'] || '';
      row.insertCell(3).textContent = entry['OT Date'] || '';
      row.insertCell(4).textContent = entry.Hours || '';
      row.insertCell(5).textContent = entry.Reason || '';
      row.insertCell(6).textContent = entry.Status || '';

      const actionCell = row.insertCell(7);
      if(entry.Status === 'Pending') {
        const approveBtn = document.createElement('button');
        approveBtn.textContent = 'Approve';
        approveBtn.onclick = () => updateStatus(entry, 'Approved');
        const denyBtn = document.createElement('button');
        denyBtn.textContent = 'Deny';
        denyBtn.onclick = () => updateStatus(entry, 'Denied');
        actionCell.appendChild(approveBtn);
        actionCell.appendChild(denyBtn);
      } else {
        actionCell.textContent = '-';
      }
    });
  }).getOTEntries();
}

// Update OT status
function updateStatus(entry, newStatus) {
  entry.Status = newStatus;
  entry.approvedBy = "Nikki";
  entry.approvedAt = new Date().toLocaleString();

  google.script.run.withSuccessHandler(() => {
    loadOTEntries();
    alert(`OT ${newStatus}!`);
  }).doPost({postData: {contents: JSON.stringify(entry)}});
}

// Auto-refresh every 30 seconds
setInterval(loadOTEntries, 30000);

// Initial table load
loadOTEntries();
