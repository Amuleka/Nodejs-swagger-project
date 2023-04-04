const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/project');
const validation = require('../middleware/validate-project');

// Projects Collection Routes
router.get('/', contactsController.getAllProjects);

router.get('/:id', contactsController.getSingleProject);

router.post('/', validation.saveProject, contactsController.createNewProject);

router.put('/:id', validation.saveProject, contactsController.updateExistingProject);

router.delete('/:id', contactsController.deleteSomeProject);

module.exports = router;
