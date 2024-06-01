const Accessory = require('../Model/accessoriesModel');

// Create a new accessory
exports.createAccessory = (req, res) => {
  const accessoryData = req.body;
  Accessory.create(accessoryData, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(result);
    }
  });
};

// Get all accessories
exports.getAllAccessories = (req, res) => {
  Accessory.getAll((err, accessories) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(accessories);
    }
  });
};

// Get a single accessory by ID
exports.getAccessoryById = (req, res) => {
  const id = req.params.id;
  Accessory.getById(id, (err, accessory) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (!accessory) {
        res.status(404).json({ message: 'Accessory not found' });
      } else {
        res.status(200).json(accessory);
      }
    }
  });
};

// Update an accessory
exports.updateAccessory = (req, res) => {
  const id = req.params.id;
  const accessoryData = req.body;
  Accessory.updateById(id, accessoryData, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Accessory not found' });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

// Delete an accessory
exports.deleteAccessory = (req, res) => {
  const id = req.params.id;
  Accessory.deleteById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Accessory not found' });
      } else {
        res.status(204).json({ message: 'Accessory deleted' });
      }
    }
  });
};
