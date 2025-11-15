const saleService = require('../services/saleService');

async function postSale(req, res) {
    try {
        const result = await saleService.registerSale(req.body);
        res.status(201).json({ 
            message: `Venta registrada y stock actualizado.`,
            sale: result.sale 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getSales(req, res) {
    try {
        const sales = await saleService.getSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener ventas.' });
    }
}

async function getSaleById(req, res) {
    try {
        const sale = await saleService.getSaleById(req.params.id);
        if (sale) {
            res.status(200).json(sale);
        } else {
            res.status(404).json({ error: 'Venta no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el detalle de la venta.' });
    }
}

module.exports = { postSale, getSales, getSaleById };