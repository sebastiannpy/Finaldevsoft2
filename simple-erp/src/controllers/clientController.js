// src/controllers/clientController.js
const clientService = require('../services/clientService');

async function postClient(req, res) {
    try {
        const newClient = await clientService.createClient(req.body);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getClients(req, res) {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes.' });
    }
}

async function getClientById(req, res) {
    try {
        const client = await clientService.getClientById(req.params.id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente.' });
    }
}

async function putClient(req, res) {
    try {
        const result = await clientService.updateClient(req.params.id, req.body);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Cliente actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'Cliente no encontrado o sin cambios.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente.' });
    }
}

module.exports = { postClient, getClients, getClientById, putClient };