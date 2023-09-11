const db = require("../../db/database");

async function queryCandidates({ page, pageSize }) {
  const offset = (page - 1) * pageSize; 
  const query = 'SELECT * FROM candidate LIMIT ? OFFSET ?';
  const params = [pageSize, offset]; 

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


async function getCandidateById(candidateId) {
  const query = 'SELECT * FROM candidate WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.get(query, [candidateId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function deleteUserById(userId) {
  const sql = 'DELETE FROM user WHERE id = ?';
  db.run(sql, userId, (err) => {
    if (err) {
      console.error('Error deleting user:', err.message);
    } else {
      console.log('User deleted successfully');
    }
  });
}

module.exports = { queryCandidates, getCandidateById, deleteUserById };
