const productService = require('../services/productService');

async function postProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getProducts(req, res) {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
}

async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
}

async function putProduct(req, res) {
    try {
        const result = await productService.updateProduct(req.params.id, req.body);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Producto y/o stock actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado o sin cambios.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
}

module.exports = { postProduct, getProducts, getProductById, putProduct };