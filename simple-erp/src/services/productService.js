// src/services/productService.js
const productRepository = require('../repositories/productRepository');

class ProductService {
    async createProduct(product) {
        if (!product.name || product.price == null || product.stock == null) {
            throw new Error("El nombre, precio y stock inicial del producto son obligatorios.");
        }
        return productRepository.create(product);
    }

    async getProducts() {
        return productRepository.findAll();
    }
    
    async getProductById(id) {
        return productRepository.findById(id);
    }
    
    async updateProduct(id, product) {
        return productRepository.update(id, product);
    }
}

module.exports = new ProductService();