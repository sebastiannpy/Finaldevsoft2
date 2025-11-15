// index.js
const express = require('express');
const app = express();
require('./database/db'); 


const { postClient, getClients, getClientById, putClient } = require('./src/controllers/clientController');
const { postProduct, getProducts, getProductById, putProduct } = require('./src/controllers/productController');
const { postSale, getSales, getSaleById } = require('./src/controllers/saleController');

app.use(express.json()); 
app.use(express.static('public')); // Hacer visible la carpeta public en el navegador


app.post('/clients', postClient);
app.get('/clients', getClients);
app.get('/clients/:id', getClientById);
app.put('/clients/:id', putClient);

app.post('/products', postProduct);
app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.put('/products/:id', putProduct);

app.post('/sales', postSale); 
app.get('/sales', getSales); 
app.get('/sales/:id', getSaleById);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sistema ERP ligero ejecutándose en http://localhost:${PORT}`);
});
