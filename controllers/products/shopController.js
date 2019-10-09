const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const Product = require("../../models/Product");
const Comment = require("../../models/Comment");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      return res.status(200).json(products);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

exports.searchProducts = (req, res, next) => {
  const { searchText } = req.body;
  Product.find({ title: { $regex: new RegExp('.*' + searchText + '.*', 'i') } })
    .then(products => {
      return res.status(200).json(products)
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}

exports.getProduct = (req, res, next) => {
  const { id } = req.params;
  Comment.find({ product: id })
    .then(comments => {
      if (comments.length > 0) {
        return Product.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(id)
            }
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id", //field from input document
              foreignField: "product", // field from documents of the 'from' collection
              as: "comments"
            }
          },
          {
            $unwind: "$comments"
          },
          {
            $lookup: {
              from: "users",
              localField: "comments.user", //field from input document
              foreignField: "_id", // field from documents of the 'from' collection
              as: "comments.user"
            }
          },
          {
            $unwind: "$comments.user"
          },
          {
            $group: {
              _id: "$_id",
              title: { $first: "$title" }, // $first returns the first expression of the document it encounters, ex. first title
              price: { $first: "$price" },
              imageUrl: { $first: "$imageUrl" },
              description: { $first: "$description" },
              rating: { $first: "$rating" },
              comments: {
                $addToSet: "$comments" // group comments and create an array
              }
            }
          },
          {
            $project: {
              _id: 1,
              title: 1,
              price: 1,
              imageUrl: 1,
              description: 1,
              rating: 1,
              comments: {
                _id: 1,
                text: 1,
                date: 1,
                user: {
                  _id: 1,
                  name: 1
                }
              }
            }
          }
        ]);
      }
      return Product.findById(id);
    })

    .then(product => {
      return res.status(200).json(product);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

exports.addComment = (req, res, next) => {
  const userId = req.user._id;
  const productId = req.body.id;
  const text = req.body.text;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      return Comment.create({
        text: text,
        user: userId,
        product: productId
      });
    })
    .then(savedComment => {
      return Comment.findById(savedComment._id).populate("user", "name");
    })
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const { id } = req.body;
  Comment.findById(id)
    .then(comment => {
      if (!comment) {
        return res.status(400).json({ message: "comment not found" });
      }
      return Comment.findByIdAndDelete(id);
    })
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

exports.addUpdateRating = (req, res, next) => {
  const rate = req.body.rate;
  const userId = req.user._id;
  const productId = req.body.id;
  Product.findOne({ _id: productId })
    .then(product => {
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      const rating = [...product.rating];
      if (rating != null) {
        const foundRatingIndex = product.rating.findIndex(
          rating => rating.user.toString() === userId
        );
        if (foundRatingIndex > 0) {
          product.rating[foundRatingIndex].rate = rate;
          return product.save();
        }
      }

      product.rating.unshift({
        rate: rate,
        user: userId
      });

      return product.save();
    })
    .then(result => {
      return result.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

exports.addToCart = (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      cart.addCart(product);
      req.session.cart = cart;
      return res.status(200).json(req.session.cart);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

exports.getCart = (req, res, next) => {
  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  const cart = new Cart(req.session.cart)
  const result = cart.getCart();
  return res.status(200).json(result);
};

exports.removeItem = (req, res, next) => {
  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  const { id } = req.body;
  const cart = new Cart(req.session.cart);
  cart.removeItem(id);
  req.session.cart = cart;
  return res.status(200).json(req.session.cart);
};

exports.updateItem = (req, res, next) => {
  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  const { id, qty } = req.body;
  const cart = new Cart(req.session.cart);
  cart.updateItem(id, qty);
  req.session.cart = cart;
  return res.status(200).json(req.session.cart);
};

exports.postOrder = (req, res, next) => {
  const { orderInfo, products, totalPrice } = req.body;
  const orderedProducts = products.map(item => {
    return {
      product: item.item,
      quantity: item.qty
    };
  });
  Order.create({
    name: orderInfo.firstName + " " + orderInfo.lastName,
    address: orderInfo.address,
    contactNumber: orderInfo.contactNumber,
    products: orderedProducts,
    user: {
      userId: req.user._id,
      email: orderInfo.email
    },
    totalPrice: totalPrice
  })
    .then(result => {
      if (!req.session.cart) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const cart = new Cart(req.session.cart);
      cart.emptyCart(req);
      return res.status(200).json(result);
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err);
    });
};

exports.getOrders = (req, res, next) => {
  const userId = req.user._id;
  Order.find({ "user.userId": userId })
    .then(orders => {
      if (!orders) {
        return res.status(400).json({ message: "no orders found" });
      }
      return res.status(200).json(orders);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

exports.getInvoice = (req, res, next) => {
  const { id } = req.params;
  Order.findById(id).then(order => {
    if (!order) {
      return res.status(400).json({ message: "order does not exist" });
    }
    const fileName = "invoice-" + id + ".pdf";
    const filePath = path.join("data", "invoices", fileName);
    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="' + fileName + '"'
    );
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.pipe(res);

    pdfDoc
      .fontSize(20)
      .fillColor("black")
      .text("Invoice", 250, 20, {
        underline: true
      });

    pdfDoc.text(".........................................", 150);

    order.products.map((product, index) => {
      pdfDoc.image(product.product.imageUrl, 20, (100 + index * 100), { width: 80, height: 60 });
      pdfDoc.fontSize(16).text(product.product.title, 150, (100 + index * 100));
      pdfDoc.fontSize(16).text(product.quantity, 300, (100 + index * 100));
      pdfDoc.fontSize(16).text(product.product.price, 450, (100 + index * 100));
    });
    const numberOfProds = order.products.length;
    pdfDoc
      .fontSize(18)
      .fillColor("green")
      .text("Total Price: " + order.totalPrice, 200, (100 + (numberOfProds) * 100));
    pdfDoc.end();
  })
    .catch(err => {
      return res.status(500).json(err);
    });
};
