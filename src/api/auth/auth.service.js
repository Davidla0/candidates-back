const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db/database');


async function generateToken(userId) {
    return jwt.sign({ userId }, process.env.SECRET_KEY);
}

async function registerUser(username, email, password) {
    const existingUser = await findUser(username, 'username');
    if (existingUser) {
        throw new Error('Username already exists. Please choose a different username.');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];

    return new Promise((resolve, reject) => {
        db.run(query, values, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

async function findUser(credentials, field) {
    const query = `SELECT * FROM user WHERE ${field} = ?`;

    return new Promise((resolve, reject) => {
        db.get(query, [credentials], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}


module.exports = { generateToken, registerUser, findUser };
