const db = require('../../database/db');

class ProductRepository {
    async create(product) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
                [product.name, product.description, product.price, product.stock],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, ...product });
                }
            );
        });
    }
    
    async findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    async update(id, product) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
                [product.name, product.description, product.price, product.stock, id],
                function(err) {
                    if (err) return reject(err);
                    resolve({ changes: this.changes });
                }
            );
        });
    }

    
    async updateStock(id, quantity) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [quantity, id],
                function(err) {
                    if (err) return reject(err);
                    resolve({ changes: this.changes });
                }
            );
        });
    }
}

module.exports = new ProductRepository();
