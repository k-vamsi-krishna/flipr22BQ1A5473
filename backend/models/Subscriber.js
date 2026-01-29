import { db } from '../database.js';
import { v4 as uuidv4 } from 'uuid';

export const Subscriber = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { email } = data;
      db.run(
        `INSERT INTO subscribers (id, email) VALUES (?, ?)`,
        [id, email],
        function (err) {
          if (err) {
            if (err.message.includes('UNIQUE')) {
              reject({ status: 400, message: 'Email already subscribed' });
            } else {
              reject(err);
            }
          } else {
            resolve({ id, email });
          }
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM subscribers ORDER BY subscribedAt DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM subscribers WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM subscribers WHERE id = ?`, [id], (err) => {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  },
};
