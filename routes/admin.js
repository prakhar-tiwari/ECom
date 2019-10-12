const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/products/adminController');
const requireLogin=require('../middlewares/requireLogin');

//private Route
router.get('/', requireLogin, adminController.getProducts);

//private Route
router.post('/', requireLogin, adminController.addProduct);

//private Route
router.delete('/:id', requireLogin, adminController.deleteProduct);


module.exports = router;
