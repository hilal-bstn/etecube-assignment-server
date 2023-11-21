const express = require('express');
const router = express.Router();
const productCTRL = require('../controllers/productController');
const auth = require('../middlewares/auth');

router.route('/add-product').post(auth, productCTRL.create);

router.route('/:id').put(auth, productCTRL.updateProduct);

router.route('/:id').delete(auth, productCTRL.deleteProduct);

router.route('/products').get(productCTRL.getAll);

router.route('/newproducts').get(productCTRL.newProducts);

router.route('/product-search/:key').get(productCTRL.productSearch);



module.exports = router;