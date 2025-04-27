const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// MongoDB connection string (replace with your own MongoDB URI)
mongoose.connect('mongodb://localhost/healthcare', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection error:', err);
    process.exit(1); // Exit the application if DB connection fails
  });

// Define the appointment model schema (for MongoDB)
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// API to book an appointment
app.post('/api/bookAppointment', async (req, res) => {
  const { name, appointmentDate } = req.body;
  
  try {
    const newAppointment = new Appointment({ name, appointmentDate });
    await newAppointment.save();
    res.status(200).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Error booking appointment' });
  }
});

// Backup history model schema (for MongoDB)
const backupHistorySchema = new mongoose.Schema({
  date: { type: Date, required: true },
});

const BackupHistory = mongoose.model('BackupHistory', backupHistorySchema);

// API to fetch backup history
app.get('/api/getBackupHistory', async (req, res) => {
  try {
    const history = await BackupHistory.find().sort({ date: -1 }); // Sorted by date
    res.json({ history });
  } catch (error) {
    console.error('Error fetching backup history:', error);
    res.status(500).json({ error: 'Error fetching backup history' });
  }
});

// API to add a new backup entry
app.post('/api/addBackupHistory', async (req, res) => {
  const { date } = req.body;
  
  try {
    const newBackup = new BackupHistory({ date: new Date(date) });
    await newBackup.save();
    res.status(201).json({ message: 'Backup history added successfully!', newBackup });
  } catch (error) {
    console.error('Error adding backup history:', error);
    res.status(500).json({ error: 'Error adding backup history' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
