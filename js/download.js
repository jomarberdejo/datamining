// Function to convert the filtered data to JSON format and trigger download
function downloadJSON() {
    const jsonData = filteredUsers; // Assuming filteredUsers holds your filtered data

    // Create a Blob containing the JSON data
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_user_data.json'; // Set the filename with .json extension
    a.style.display = 'none';

    // Trigger the click event to initiate the download
    document.body.appendChild(a);
    a.click();

    // Cleanup: revoke the object URL
    URL.revokeObjectURL(url);
}

// Add a click event listener to the "Download JSON" button
document.getElementById('downloadJSON').addEventListener('click', downloadJSON);
