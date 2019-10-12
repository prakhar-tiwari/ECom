const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuid = require('uuid/v4');

const authRoute = require('./routes/auth');
const productRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const MONGODB_URI = require('./utils/keys').MONGODB_URI;
const keys = require('./utils/keys');

const port = process.env.PORT || 8080;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
})
    .then(result => {
        console.log("mongodb connected");
    })
    .catch(err => {
        console.log(err);
    })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: keys.secretOrKey,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: { maxAge: 180 * 60 * 1000 },
}))

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
});


app.use('/images', express.static(path.join(__dirname, 'images')));

const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

app.use(multer({ storage: fileStorage, fileFilter: filter }).single('image'));

// app.use((req,res,next)=>{
//     res.locals.session=req.session;
//     next();
// });
app.use(authRoute);
app.use('/product', productRoute);
app.use('/shop', shopRoute);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(port, () => console.log('server listening on port ' + port));