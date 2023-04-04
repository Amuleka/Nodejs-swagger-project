const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/company');
const validation = require('../middleware/validate-company');

// Companies Collection Routes
router.get('/', contactsController.getAllCompanies);

router.get('/:id', contactsController.getSingleCompany);

router.post('/', validation.saveCompany, contactsController.createNewCompany);

router.put('/:id', validation.saveCompany, contactsController.updateExistingCompany);

router.delete('/:id', contactsController.deleteSomeCompany);

module.exports = router;
