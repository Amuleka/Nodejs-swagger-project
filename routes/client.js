const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/client');
const validation = require('../middleware/validate');

// Clients Collection Routes
router.get('/', contactsController.getAllClients);

router.get('/:id', contactsController.getSingleClient);

router.post('/', validation.saveContact, contactsController.createNewClient);

router.put('/:id', validation.saveContact, contactsController.updateExistingClient);

router.delete('/:id', contactsController.deleteSomeClient);

module.exports = router;