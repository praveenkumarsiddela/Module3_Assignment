const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/getLoans', loanController.getLoans)
router.post('/createLoan', loanController.createLoan)
router.patch('/updateLoan/:id', loanController.updateLoan)
router.delete('/deleteLoan/:id', loanController.deleteLoan)

module.exports = router;
