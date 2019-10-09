const express = require('express');
const router = express.Router();
const passport = require('passport');
const shopController = require('../controllers/products/shopController');
const requireLogin = require('../middlewares/requireLogin');


//public route
router.get('/getproducts', shopController.getProducts);

//public route
router.get('/searchproducts', shopController.searchProducts);

//public route
router.get('/getproduct/:id', shopController.getProduct);

//private route
router.post('/comment', requireLogin, shopController.addComment);

//private route
router.post('/deletecomment', requireLogin, shopController.deleteComment);

//private route
router.post('/rating', requireLogin, shopController.addUpdateRating);

//private route
router.post('/add-to-cart/:id', requireLogin, shopController.addToCart);

//private route
router.get('/getcart', requireLogin, shopController.getCart);

//private route
router.post('/removeitem', requireLogin, shopController.removeItem);

//private route
router.post('/updateitem', requireLogin, shopController.updateItem);

//private route
router.post('/order', requireLogin, shopController.postOrder);

//private route
router.get('/order', requireLogin, shopController.getOrders);

//private route
router.get('/order/:id', requireLogin, shopController.getInvoice);

router.post('/searchproducts', shopController.searchProducts);

module.exports = router;
