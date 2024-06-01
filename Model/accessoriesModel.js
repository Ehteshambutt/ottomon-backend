const db = require('../DBConfig/dbConfig');

const Accessory = {
  create: (data, callback) => {
    db.query(
      'INSERT INTO accessories (name, description, quantity, created_date, updated_date, star, price, actual_price, discount, title, image, hoverImage, brand, Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.name,
        data.description,
        data.quantity,
        new Date(),
        new Date(),
        data.star,
        data.price,
        data.actual_price,
        data.discount,
        data.title,
        data.image,
        data.hoverImage,
        data.brand,
        data.Type
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAll: (callback) => {
    db.query('SELECT * FROM accessories', (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM accessories WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    });
  },

  updateById: (id, data, callback) => {
    db.query(
      'UPDATE accessories SET name = ?, description = ?, quantity = ?, updated_date = ?, star = ?, price = ?, actual_price = ?, discount = ?, title = ?, image = ?, hoverImage = ?, brand = ?, Type = ? WHERE id = ?',
      [
        data.name,
        data.description,
        data.quantity,
        new Date(),
        data.star,
        data.price,
        data.actual_price,
        data.discount,
        data.title,
        data.image,
        data.hoverImage,
        data.brand,
        data.Type,
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteById: (id, callback) => {
    db.query('DELETE FROM accessories WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  }
};

module.exports = Accessory;
