const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/user');
const validation = require('../middleware/validate-user');

// Users Collection Routes
router.get('/', contactsController.getAllUsers);

router.get('/:id', contactsController.getSingleUser);

router.post('/', validation.saveContact, contactsController.createNewUser);

router.put('/:id', validation.saveContact, contactsController.updateExistingUser);

router.delete('/:id', contactsController.deleteSomeUser);

module.exports = router;
