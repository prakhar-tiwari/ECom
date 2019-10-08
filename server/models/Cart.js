module.exports = function Cart(oldCart) {
  this.items = oldCart.items || [];
  this.totalQuantity = oldCart.totalQuantity || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.addCart = prod => {
    var found = false;
    if (this.items.length > 0) {
      this.items.map(item => {
        if (item.item._id.toString() === prod._id.toString()) {
          found = true;
          var prevqty = item.qty;
          item.qty++;
          this.totalQuantity++;
          this.totalPrice += prod.price * (item.qty - prevqty);
        }
      });
    }
    if (!found) {
      this.items.push({
        item: prod,
        qty: 1,
        price: prod.price
      });
      this.totalQuantity++;
      this.totalPrice += prod.price;
    }
  };

  this.getCart = () => {
    // var obj=Object.assign({},this.items);
    return {
      items: this.items,
      quantity: this.totalQuantity,
      totalPrice: this.totalPrice
    };
  };

  this.emptyCart = request => {
    this.items = {};
    this.totalPrice = 0;
    this.totalQuantity = 0;
    request.session.cart = {};
  };

  this.removeItem = id => {
    const item = this.items.find(
      item => item.item._id.toString() === id.toString()
    );
    const { qty, price } = item;
    const newItems = this.items.filter(
      item => item.item._id.toString() !== id.toString()
    );
    this.totalQuantity = this.totalQuantity - qty;
    this.totalPrice = this.totalPrice - price * qty;
    this.items = [...newItems];
  };

  this.updateItem = (id, qty) => {
    const item = this.items.find(
      item => item.item._id.toString() === id.toString()
    );
    var diffQty = qty - item.qty;
    var diffPrice = item.price * diffQty;
    item.qty = qty;
    const indexOfItem = this.items.findIndex(
      item => item.item._id.toString() === id.toString()
    );
    const newItems = Object.assign([], this.items, { [indexOfItem]: item });
    this.items = [...newItems];
    diffQty > 0
      ? (this.totalQuantity += diffQty)
      : (this.totalQuantity -= Math.abs(diffQty));
    diffPrice > 0
      ? (this.totalPrice += diffPrice)
      : (this.totalPrice -= Math.abs(diffPrice));
  };

  // this.add = function (item, id) {
  //     var storedItem = this.items[id];
  //     if (!storedItem) {
  //         storedItem = this.items[id] = {
  //             item: item,
  //             price: 0,
  //             qty: 0
  //         }
  //     }
  //     storedItem.qty++;
  //     storedItem.price = item.price * storedItem.qty;
  //     this.totalQuantity++;
  //     this.totalPrice = this.totalPrice + storedItem.price;
  // }
};
