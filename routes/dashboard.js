const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const dashController = require('../controller/dashController');
const db = require('../models/User');


// add employee page
router.get('/add',dashController.add_page);

// add employee 
router.post('/add',dashController.add_employee)
// edit form render page
router.get('/:id', dashController.edit_form_page);

// editing the employee details
router.post('/:id',dashController.edit_employee_details);

// deleting the employe record
router.delete('/:id',dashController.employe_delete);




module.exports = router;

