// saleModel.js
const db = require('../DBConfig/dbConfig');

const Sale = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM sale';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM sale WHERE id = ?';
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = 'INSERT INTO sale SET ?';
    db.query(sql, data, callback);
  },

  update: (id, data, callback) => {
    const sql = 'UPDATE sale SET ? WHERE id = ?';
    db.query(sql, [data, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM sale WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Sale;
