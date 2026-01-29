import { db } from '../database.js';
import { v4 as uuidv4 } from 'uuid';

export const Client = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { name, email, phone, company, feedback, rating, image } = data;
      db.run(
        `INSERT INTO clients (id, name, email, phone, company, feedback, rating, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, email, phone, company, feedback, rating || 5, image],
        function (err) {
          if (err) reject(err);
          else resolve({ id, name, email, phone, company, feedback, rating: rating || 5, image });
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM clients WHERE status = 'active' ORDER BY createdAt DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM clients WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { name, email, phone, company, feedback, rating, image } = data;
      db.run(
        `UPDATE clients SET name = ?, email = ?, phone = ?, company = ?, feedback = ?, rating = ?, image = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [name, email, phone, company, feedback, rating, image, id],
        (err) => {
          if (err) reject(err);
          else resolve({ id, ...data });
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE clients SET status = 'deleted' WHERE id = ?`, [id], (err) => {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  },
};
