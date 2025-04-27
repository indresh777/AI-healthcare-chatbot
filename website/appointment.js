document.getElementById("appointmentForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    let name = document.getElementById("name").value;
    let appointmentDate = document.getElementById("appointmentDate").value;
  
    fetch('/api/bookAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, appointmentDate })
    })
    .then(response => response.json())
    .then(data => {
      alert('Appointment booked successfully!');
    })
    .catch(error => {
      console.error('Error booking appointment:', error);
    });
  });
  