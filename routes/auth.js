const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const passport = require('passport');
const authController = require('../controllers/auth/authcontroller');

router.post('/login', [
    body('email', 'Invalid Email')
        .isEmail(),
    body('password', 'Password must be minimum 8 characters')
        .trim()
        .isLength({ min: 8 })
],
    authController.loginUser);

router.post('/signup', [
    body('name', 'Name must be minimum 3 characters')
        .isLength({ min: 3 }),
    body('email', 'Invalid Email')
        .isEmail(),
    body('password', 'Password must be minimum 8 characters')
        .trim()
        .isLength({ min: 8 }),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true;
        })
        .trim(),
    body('contactNumber', 'Contact number must be numeric and contain 10 digits')
        .isNumeric()
        .isLength({ min: 10, max: 10 }),
    body('address', 'Address must be minimum 10 characters')
        .isLength({ min: 10 })
], authController.signup);

router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('http://localhost:3000');
    }
);

router.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    })
)

router.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
        res.redirect('http://localhost:3000');
    })

router.get('/current_user', (req, res, next) => {
    return res.send(req.user);
});

router.get('/auth/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('http://localhost:3000');
})


module.exports = router;