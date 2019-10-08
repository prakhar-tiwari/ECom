const fs = require('fs');
const Product = require('../../models/Product');
const Comment = require('../../models/Comment');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
}

exports.addProduct = (req, res, next) => {
    const { title, price, description } = req.body;
    const image = req.file;
    if (!image) {
        return res.status(400).json({ message: 'Attached file is not a valid image' });
    }
    const product = new Product({
        title: title,
        imageUrl: image.path,
        price: price,
        description: description,
        user: req.user.id
    })
    Product.findOne({ title: title })
        .then(prod => {
            if (prod) {
                return res.json({ message: 'Product already exists' });
            }
            return Product.create(product);
        })
        .then(prod => {
            return res.status(200).json({ message: 'Product created successfully' });
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}

exports.getEditProducts = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(400).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        })
        .catch(err => {
            return res.status(200).json(err);
        })
}

exports.editProducts = (req, res, next) => {
    const userId = req.user.id;
    const { productId, title, price, description } = req.body;
    const image = req.file;
    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(400).json({ message: "Product not found" });
            }
            if (product.user.toString() !== userId.toString()) {
                return res.status(400).json({ message: "User not authorized" });
            }
            product.title = title;
            product.price = price;
            product.description = description;
            if (image) {
                fs.unlink(product.imageUrl, err => {
                    if (err) {
                        throw err;
                    }
                });
                product.imageUrl = image.path;
            }
            return product.save();
        })
        .then(result => {
            return res.status(200).json({ message: "Updated successfully" });
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}

exports.deleteProduct = (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    Product.findById(id)
        .then(product => {
            if (!product) {
                return res.status(400).json({ message: "Product not found" });
            }
            fs.unlink(product.imageUrl, err => {
                if (err) {
                    throw err;
                }
            })
            return Comment.find({product:id});
        })
        .then(products=>{
            if(products){
                return Comment.deleteMany({product:id})
            }
        })
        .then(result=>{
            if(result){
                return Product.deleteOne({ _id: id, user: userId });
            }
            res.status(200).json({ message: "Product deleted" })
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}