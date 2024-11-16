const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL user
  password: 'password', // Your MySQL password
  database: 'college_management_system'
});

// Test MySQL connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API Endpoints for the Student Management

// Fetch all students
app.get('/api/students', (req, res) => {
  connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a new student
app.post('/api/students', (req, res) => {
  const { name, email, phone, user_id } = req.body;
  connection.query(
    'INSERT INTO students (name, email, phone, user_id) VALUES (?, ?, ?, ?)',
    [name, email, phone, user_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ message: 'Student added', id: result.insertId });
      }
    }
  );
});

// Update a student
app.put('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, email, phone } = req.body;
  connection.query(
    'UPDATE students SET name = ?, email = ?, phone = ? WHERE student_id = ?',
    [name, email, phone, studentId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'Student updated' });
      }
    }
  );
});

// Delete a student
app.delete('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  connection.query(
    'DELETE FROM students WHERE student_id = ?',
    [studentId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'Student deleted' });
      }
    }
  );
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
