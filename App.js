const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'college_management_system'
});

db.connect(err => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// API to fetch all students
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// API to add a new student
app.post('/api/students', (req, res) => {
  const { name, email, phone } = req.body;
  const query = 'INSERT INTO students (name, email, phone) VALUES (?, ?, ?)';
  db.query(query, [name, email, phone], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Student added', studentId: results.insertId });
    }
  });
});

// API to update a student's information
app.put('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, email, phone } = req.body;
  const query = 'UPDATE students SET name = ?, email = ?, phone = ? WHERE student_id = ?';
  db.query(query, [name, email, phone, studentId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Student updated' });
    }
  });
});

// API to delete a student
app.delete('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'DELETE FROM students WHERE student_id = ?';
  db.query(query, [studentId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Student deleted' });
    }
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
