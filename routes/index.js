const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/project', require('./project'));
router.use('/user', require('./user'));
router.use('/client', require('./client'));
router.use('/company', require('./company'));




module.exports = router;
