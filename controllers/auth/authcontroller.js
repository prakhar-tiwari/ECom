const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');
const keys = require('../../utils/keys').secretOrKey;
const passport = require('passport');

const User = require('../../models/User');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

    const { name, email, password, contactNumber, address } = req.body;
    User.findOne({ email: email })
        .then(user => {
            console.log(user);
            if (user) {
                return res.status(400).json({ message: 'User already exists' })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const newUser = {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        contactNumber: contactNumber,
                        address: address
                    }
                    User.create(newUser)
                        .then(result => {
                            return res.status(200).json({ message: 'User created successfully.' })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            res.json(err);
        })
}

exports.loginUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    const { email, password } = req.body;
    let authUser;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "User is not present" })
            }
            authUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: authUser._id,
                    name: authUser.name
                }
                jwt.sign(
                    payload,
                    keys,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) {
                            return res.status(400).json(err);
                        }
                        return res.status(200)
                            .json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                    })
            }
            else {
                return res.status(400).json({ message: "Password incorrect" })
            }
        })
        .catch(err => {
            res.status(400).json(err);
        })

}