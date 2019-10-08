const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/products/adminController');

//private Route
router.get('/', passport.authenticate('jwt', { session: false }), adminController.getProducts);

//private Route
router.post('/', passport.authenticate('jwt', { session: false }), adminController.addProduct);

//private Route
router.delete('/:id', passport.authenticate('jwt', { session: false }), adminController.deleteProduct);


module.exports = router;
