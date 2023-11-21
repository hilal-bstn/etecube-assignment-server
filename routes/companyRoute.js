const express = require('express');
const router = express.Router();
const companyCTRL = require('../controllers/companyController');
const auth = require('../middlewares/auth');

router.route('/add-company').post(auth, companyCTRL.createCompany);

router.route('/:id')
    .put(auth, companyCTRL.update)
    .delete(auth, companyCTRL.deleteCompany);

router.route('/companies').get(companyCTRL.getCompanies);

router.route('/newcompanies').get(companyCTRL.newCompanies);

router.route('/company-search/:key').get(companyCTRL.companySearch);

module.exports = router;