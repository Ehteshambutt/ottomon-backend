// saleController.js
const Sale = require('../Model/saleModel');

const getAllSales = (req, res) => {
  Sale.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

const getSaleById = (req, res) => {
  const { id } = req.params;
  Sale.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Sale not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

const createSale = (req, res) => {
  const newSale = req.body;
  Sale.create(newSale, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ id: result.insertId, ...newSale });
    }
  });
};

const updateSale = (req, res) => {
  const { id } = req.params;
  const updatedSale = req.body;
  Sale.update(id, updatedSale, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: 'Sale updated successfully' });
    }
  });
};

const deleteSale = (req, res) => {
  const { id } = req.params;
  Sale.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: 'Sale deleted successfully' });
    }
  });
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
