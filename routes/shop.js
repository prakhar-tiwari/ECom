const express = require('express');
const router = express.Router();
const passport = require('passport');
const shopController = require('../controllers/products/shopController');


//public route
router.get('/getproducts', shopController.getProducts);

//public route
router.get('/searchproducts', shopController.searchProducts);

//public route
router.get('/getproduct/:id', shopController.getProduct);

//private route
router.post('/comment', passport.authenticate('jwt', { session: false }), shopController.addComment);

//private route
router.post('/deletecomment', passport.authenticate('jwt', { session: false }), shopController.deleteComment);

//private route
router.post('/rating', passport.authenticate('jwt', { session: false }), shopController.addUpdateRating);

//private route
router.post('/add-to-cart/:id', passport.authenticate('jwt', { session: false }), shopController.addToCart);

//private route
router.get('/getcart', passport.authenticate('jwt', { session: false }), shopController.getCart);

//private route
router.post('/removeitem', passport.authenticate('jwt', { session: false }), shopController.removeItem);

//private route
router.post('/updateitem', passport.authenticate('jwt', { session: false }), shopController.updateItem);

//private route
router.post('/order', passport.authenticate('jwt', { session: false }), shopController.postOrder);

//private route
router.get('/order', passport.authenticate('jwt', { session: false }), shopController.getOrders);

//private route
router.get('/order/:id', passport.authenticate('jwt', { session: false }), shopController.getInvoice);

router.post('/searchproducts',shopController.searchProducts);

module.exports = router;
