document.getElementById('otForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent form from reloading the page

    // get form values
    const manager = document.getElementById('manager').value;
    const employee = document.getElementById('employee').value;
    const date = document.getElementById('date').value;
    const hours = document.getElementById('hours').value;
    const reason = document.getElementById('reason').value;
    const status = document.getElementById('status').value;

    // add row to table
    const table = document.getElementById('otTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = date;
    newRow.insertCell(1).innerText = manager;
    newRow.insertCell(2).innerText = employee;
    newRow.insertCell(3).innerText = hours;
    newRow.insertCell(4).innerText = reason;
    newRow.insertCell(5).innerText = status;

    // reset form
    document.getElementById('otForm').reset();
});
