const db = require('../DBConfig/dbConfig');

// Get all mattresses
exports.getAllMattresses = (req, res) => {
    const query = 'SELECT * FROM Mattresses';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Get a single mattress by ID
exports.getMattressById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Mattresses WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Mattress not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Create a new mattress
exports.createMattress = (req, res) => {
    const { name, price, discount, category, size, image, hoverImage, description, firmness,Type  } = req.body;
    const query = 'INSERT INTO Mattresses (name, price, discount, category, size, image, hoverImage, description, firmness, Type ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    db.query(query, [name, price, discount, category, size, image, hoverImage, description, firmness,Type ], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Mattress created successfully', id: results.insertId });
    });
};

// Update a mattress by ID
exports.updateMattress = (req, res) => {
    const { id } = req.params;
    const { name, price, discount, category, size, image, hoverImage, description, firmness,Type  } = req.body;
    const query = 'UPDATE Mattresses SET name = ?, price = ?, discount = ?, category = ?, size = ?, image = ?, hoverImage = ?, description = ?, firmness = ? WHERE id = ?,Type =?';
    db.query(query, [name, price, discount, category, size, image, hoverImage, description, firmness,Type, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Mattress not found' });
        }
        res.status(200).json({ message: 'Mattress updated successfully' });
    });
};

// Delete a mattress by ID
exports.deleteMattress = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Mattresses WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Mattress not found' });
        }
        res.status(200).json({ message: 'Mattress deleted successfully' });
    });
};
