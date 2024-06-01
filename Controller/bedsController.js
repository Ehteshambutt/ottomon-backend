// controllers/bedsController.js
const mysql = require('mysql');
require('dotenv').config();

// Set up database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

exports.getAllBeds = (req, res) => {
  const sql = 'SELECT * FROM Beds';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
 
exports.getBedById = (req, res) => {
  const sql = 'SELECT * FROM Beds WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.createBed = (req, res) => {
  const newBed = req.body;
  const sql = 'INSERT INTO Beds SET ?';
  db.query(sql, newBed, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newBed });
  });
};

exports.updateBed = (req, res) => {
  const updatedBed = req.body;
  const sql = 'UPDATE Beds SET ? WHERE id = ?';
  db.query(sql, [updatedBed, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ id: req.params.id, ...updatedBed });
  });
};

exports.deleteBed = (req, res) => {
  const sql = 'DELETE FROM Beds WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Bed deleted successfully' });
  });
};
