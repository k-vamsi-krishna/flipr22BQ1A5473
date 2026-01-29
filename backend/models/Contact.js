import { db } from '../database.js';
import { v4 as uuidv4 } from 'uuid';

export const Contact = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { fullName, email, mobile, city } = data;
      db.run(
        `INSERT INTO contacts (id, fullName, email, mobile, city) VALUES (?, ?, ?, ?, ?)`,
        [id, fullName, email, mobile, city],
        function (err) {
          if (err) reject(err);
          else resolve({ id, fullName, email, mobile, city });
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM contacts ORDER BY createdAt DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM contacts WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM contacts WHERE id = ?`, [id], (err) => {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  },
};
