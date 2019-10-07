import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      contactNumber: "",
      email:""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const orderInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      contactNumber: this.state.contactNumber,
      email:this.state.email
    };
    const products = this.props.cart.cart.items;
    const totalPrice = this.props.cart.cart.totalPrice;
    axios
      .post("/shop/order", {
        orderInfo: orderInfo,
        products: products,
        totalPrice: totalPrice
      })
      .then(result => {
          this.props.history.push('/orders');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <form id="contact-form" onSubmit={this.handleSubmit}>
          <div className="messages" />
          <div className="controls">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="form_name">Firstname *</label>
                  <input
                    id="form_name"
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Please enter your firstname *"
                    required="required"
                    data-error="Firstname is required."
                    onChange={this.handleChange}
                  />
                  <div className="help-block with-errors" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="form_lastname">Lastname *</label>
                  <input
                    id="form_lastname"
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Please enter your lastname *"
                    required="required"
                    data-error="Lastname is required."
                    onChange={this.handleChange}
                  />
                  <div className="help-block with-errors" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="form_email">Email *</label>
                  <input
                    id="form_email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Please enter your Email *"
                    required="required"
                    data-error="Email is required."
                    onChange={this.handleChange}
                  />
                  <div className="help-block with-errors" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="form_contactNumber">Contact Number *</label>
                  <input
                    id="form_contactNumber"
                    type="number"
                    name="contactNumber"
                    className="form-control"
                    placeholder="Please enter your Contact Number *"
                    required="required"
                    data-error="Contact number is required."
                    onChange={this.handleChange}
                  />
                  <div className="help-block with-errors" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="form_address">Address *</label>
                  <textarea
                    id="form_address"
                    name="address"
                    className="form-control"
                    placeholder="Enter you full address *"
                    rows="4"
                    required="required"
                    data-error="Please, leave us a message."
                    onChange={this.handleChange}
                  />
                  <div className="help-block with-errors" />
                </div>
              </div>
              <div className="col-md-12">
                <input
                  type="submit"
                  className="btn btn-success btn-send"
                  value="Order"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(mapStateToProps)(Checkout);
