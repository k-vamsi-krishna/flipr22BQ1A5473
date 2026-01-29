import { db } from '../database.js';
import { v4 as uuidv4 } from 'uuid';

export const Project = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { title, description, image, category } = data;
      db.run(
        `INSERT INTO projects (id, title, description, image, category) VALUES (?, ?, ?, ?, ?)`,
        [id, title, description, image, category],
        function (err) {
          if (err) reject(err);
          else resolve({ id, title, description, image, category });
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM projects WHERE status = 'active' ORDER BY createdAt DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM projects WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { title, description, image, category } = data;
      db.run(
        `UPDATE projects SET title = ?, description = ?, image = ?, category = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [title, description, image, category, id],
        (err) => {
          if (err) reject(err);
          else resolve({ id, ...data });
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE projects SET status = 'deleted' WHERE id = ?`, [id], (err) => {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  },
};
