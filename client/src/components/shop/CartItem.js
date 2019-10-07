import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { updateItem } from "../../actions/cartActions";

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      qty: 0
    };
  }
  quantityChange = e => {
    if (e.target.value < 1) {
      this.setState({ qty: 1 });
    } else {
      this.setState({ [e.target.name]: e.target.value });
      const { item } = this.props;
      this.props.updateItem(item.item._id, e.target.value);
    }
  };
  render() {
    const { item } = this.props;
    const oldSubtotal = item.qty * item.price;
    const newSubTotal = this.state.qty * item.price;
    return (
      <tbody>
        <tr>
          <td data-th="Product">
            <div className="row">
              <div className="col-sm-2 hidden-xs">
                <img
                  src={item.item.imageUrl}
                  alt="..."
                  className="img-responsive"
                />
              </div>
              <div className="col-sm-10">
                <h4 className="nomargin">{item.item.title}</h4>
                <p>{item.item.description}</p>
              </div>
            </div>
          </td>
          <td data-th="Price">{item.price}</td>
          <td data-th="Quantity">
            <input
              type="number"
              name="qty"
              className="form-control text-center"
              onChange={this.quantityChange}
              value={this.state.qty > 0 ? this.state.qty : item.qty}
            />
          </td>
          <td data-th="Subtotal" className="text-center">
            {this.state.qty > 0 ? newSubTotal : oldSubtotal}
          </td>
          <td className="actions" data-th="">
            <button className="btn btn-danger btn-sm">
              <i>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={this.props.delete.bind(this, item.item._id)}
                />
              </i>
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { updateItem }
)(CartItem);
