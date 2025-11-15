// src/repositories/saleRepository.js
const db = require('../../database/db');

class SaleRepository {
    async create(sale) {
        const { client_id, product_id, quantity, subtotal, total } = sale;
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO sales (client_id, product_id, quantity, subtotal, total) VALUES (?, ?, ?, ?, ?)',
                [client_id, product_id, quantity, subtotal, total],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, ...sale });
                }
            );
        });
    }

    async findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM sales', (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM sales WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}
module.exports = new SaleRepository();