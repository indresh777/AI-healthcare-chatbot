document.getElementById("addBackupForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const backupDate = document.getElementById("backupDate").value;
  
    fetch('/api/addBackupHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: backupDate })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Show success message
      loadBackupHistory(); // Reload the backup history list after adding
    })
    .catch(error => {
      console.error('Error adding backup history:', error);
    });
  });
  