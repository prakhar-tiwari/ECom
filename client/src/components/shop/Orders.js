import React, { Component } from "react";
import axios from "axios";

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }
  componentWillMount() {
    axios
      .get("/shop/order")
      .then(result => {
        this.setState({ orders: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getInvoice(orderId) {
    axios({
      url:"/shop/order/" + orderId,
      method:'GET',
      responseType:'blob'
    })
      .then(response => {
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',"invoice-"+orderId+".pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const orderList = this.state.orders.map(order => (
      <li key={order._id}>
        <h4>Order Id: {order._id}</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={product.product._id}>
                <th scope="row">{index}</th>
                <td>{product.product.title}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
            <tr>
              <td>
                <h5>
                  <strong>Total Price: {order.totalPrice}</strong>
                </h5>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={this.getInvoice.bind(this, order._id)}
                >
                  Invoice
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    ));
    return (
      <div className="container">
        <div className="row">
          <ul className="col-md-8">{orderList}</ul>
        </div>
      </div>
    );
  }
}

export default Orders;
