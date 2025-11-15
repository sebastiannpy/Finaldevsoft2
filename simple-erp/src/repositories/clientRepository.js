const db = require('../../database/db');

class ClientRepository {
    async create(client) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
                [client.name, client.email, client.phone],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, ...client });
                }
            );
        });
    }

    async findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM clients', (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    
    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM clients WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    async update(id, client) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?',
                [client.name, client.email, client.phone, id],
                function(err) {
                    if (err) return reject(err);
                    resolve({ changes: this.changes });
                }
            );
        });
    }
}

module.exports = new ClientRepository();