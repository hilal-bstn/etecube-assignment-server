const express = require('express');
const router = express.Router();
const authCTRL = require('../controllers/authController');

router.route('/register').post(authCTRL.signUp);
router.route('/login').post(authCTRL.signIn);
router.route('/total-user').get(authCTRL.totalUser);
router.route('/new-users').get(authCTRL.newUsers);



module.exports = router;