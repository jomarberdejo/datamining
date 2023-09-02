    // Function to convert the table data to JSON format and trigger download
function downloadJSON() {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
    const jsonData = [];

    // Extract data from each row and format it as JSON objects
    rows.forEach((row) => {
        const rowData = {};
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell, index) => {
            const header = table.querySelector('thead th:nth-child(' + (index + 1) + ')').textContent;
            rowData[header] = cell.textContent;
        });
        jsonData.push(rowData);
    });

    // Create a Blob containing the JSON data
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_data.json'; // Set the filename with .json extension
    a.style.display = 'none';

    // Trigger the click event to initiate the download
    document.body.appendChild(a);
    a.click();

    // Cleanup: revoke the object URL
    URL.revokeObjectURL(url);
}

// Add a click event listener to the "Download JSON" button
document.getElementById('downloadJSON').addEventListener('click', downloadJSON);