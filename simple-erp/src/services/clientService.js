// src/services/clientService.js
const clientRepository = require('../repositories/clientRepository');

class ClientService {
    async createClient(client) {
        if (!client.name || !client.email) {
            throw new Error("El nombre y el email del cliente son obligatorios.");
        }
        return clientRepository.create(client);
    }

    async getClients() {
        return clientRepository.findAll();
    }
    
    async getClientById(id) {
        return clientRepository.findById(id);
    }
    
    async updateClient(id, client) {
        return clientRepository.update(id, client);
    }
}

module.exports = new ClientService();