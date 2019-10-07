import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem";
import { getCart, deleteItemFromCart } from "../../actions/cartActions";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0
    };
  }
  componentWillMount() {
    this.props.getCart();
  }

  onRemoveItem = id => {
    this.props.deleteItemFromCart(id);
  };

  render() {
    const { items, quantity, totalPrice } = this.props.cart.cart;
    return (
      <div className="container">
        {items && items.length > 0 ? (
          <table id="cart" className="table table-hover table-condensed">
            <thead>
              <tr>
                <th style={{ width: "50%" }}>Product</th>
                <th style={{ width: "10%" }}>Price</th>
                <th style={{ width: "8%" }}>Quantity</th>
                <th style={{ width: "22%" }} className="text-center">
                  Subtotal
                </th>
                <th style={{ width: "10%" }} />
              </tr>
            </thead>
            {items.map(item => (
              <CartItem
                setTotalPrice={this.setTotalPrice}
                key={item.item._id}
                delete={this.onRemoveItem}
                item={item}
                quantity={quantity}
                totalPrice={totalPrice}
              />
            ))}
            <tfoot>
              <tr>
                <td>
                  <Link to="/" className="btn btn-warning">
                    <i>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </i>
                    Continue Shopping
                  </Link>
                </td>
                <td className="hidden-xs" />
                <td colSpan="2" className="hidden-xs text-center">
                  <strong>
                    Total{" "}
                    {this.state.totalPrice > 0
                      ? this.state.totalPrice
                      : totalPrice}
                  </strong>
                </td>
                <td>
                  <Link to="/checkout" className="btn btn-success btn-block">
                    Checkout
                    <i>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </i>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <h2
            style={{
              textAlign: "center",
              color: "#fe355h",
              margin: "100 auto"
            }}
          >
            No items in the cart
          </h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCart, deleteItemFromCart }
)(Cart);
