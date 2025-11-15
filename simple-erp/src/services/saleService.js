// src/services/saleService.js
const saleRepository = require('../repositories/saleRepository');
const productRepository = require('../repositories/productRepository');

class SaleService {
    async registerSale(saleRequest) {
        const { client_id, product_id, quantity } = saleRequest;
        
        // 1. Obtener producto y verificar existencia
        const product = await productRepository.findById(product_id);
        if (!product) {
            throw new Error(`Error: Producto con ID ${product_id} no encontrado.`);
        }

        // 2. Verificación de Stock (ASR Crítico: Integridad)
        if (product.stock < quantity) {
            throw new Error(`Error: Stock insuficiente para ${product.name}. Disponible: ${product.stock}`);
        }

        // 3. Cálculo de Venta
        const subtotal = product.price * quantity;
        const total = subtotal; 

        const saleData = { client_id, product_id, quantity, subtotal, total };

        // 4. Registrar la Venta
        const newSale = await saleRepository.create(saleData);

        // 5. Actualización de Inventario (Operación CRÍTICA)
        await productRepository.updateStock(product_id, quantity);
        
        return { 
            sale: newSale, 
            productName: product.name 
        };
    }

    async getSales() {
        return saleRepository.findAll();
    }

    async getSaleById(id) {
        return saleRepository.findById(id);
    }
}

module.exports = new SaleService();