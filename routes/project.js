const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/project');
const validation = require('../middleware/validate');

// Projects Collection Routes
router.get('/', contactsController.getAllProjects);

router.get('/:id', contactsController.getSingleProject);

router.post('/', validation.saveContact, contactsController.createNewProject);

router.put('/:id', validation.saveContact, contactsController.updateExistingProject);

router.delete('/:id', contactsController.deleteSomeProject);

module.exports = router;
