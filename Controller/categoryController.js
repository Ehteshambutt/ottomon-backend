const db = require('../DBConfig/dbConfig');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/'); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${path.basename(file.originalname)}`); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Get all categories
exports.getAllCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Create a new category with image upload
exports.createCategory = (req, res) => {
  const { name, created_date } = req.body;
  const imagePath = req.file ? req.file.path : null; // Get uploaded image path
  db.query(
    'INSERT INTO categories (name, image_path, created_date) VALUES (?, ?, ?)',
    [name, imagePath, created_date],
    (err, result) => {
      if (err) throw err;
      res.status(201).send('Category created successfully');
    }
  );
};

// Update a category by ID with optional image upload
exports.updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { name, created_date } = req.body;
  const imagePath = req.file ? req.file.path : null; // Get uploaded image path

  let query = 'UPDATE categories SET name = ?, created_date = ?';
  const updateValues = [name, created_date];

  if (imagePath) {
    query += ', image_path = ?';
    updateValues.push(imagePath);
  }

  query += ' WHERE id = ?';
  updateValues.push(categoryId);

  db.query(query, updateValues, (err, result) => {
    if (err) throw err;
    res.send('Category updated successfully');
  });
};

// Delete a category by ID
exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;
  db.query('DELETE FROM categories WHERE id = ?', [categoryId], (err, result) => {
    if (err) throw err;
    res.send('Category deleted successfully');
  });
};

module.exports = exports;
