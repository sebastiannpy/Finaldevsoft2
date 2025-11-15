// database/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/erp.db');

db.serialize(() => {
    // Tabla Clientes
    db.run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    )`);

    // Tabla Productos (incluye stock para el control de inventario)
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        code TEXT UNIQUE
    )`);

    // Tabla Ventas (vincula cliente y producto)
    db.run(`CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        subtotal REAL NOT NULL,
        total REAL NOT NULL,
        date TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
});

console.log("Base de datos y tablas inicializadas.");
module.exports = db;