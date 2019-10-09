import React, { Component } from "react";
import classes from "../css/product-lists.module.css";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../../actions/shopActions";
import Pagination from "../common/Pagination";

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      pageItems: []
    };
  }

  componentWillMount() {
    this.props.getProducts();
  }

  onPageChange = pageItems => {
    this.setState({ pageItems: pageItems });
  };

  render() {
    const { products } = this.props.shop;
    const { pageItems } = this.state;
    return (
      <div className="container">
        <div className={classes.grid}>
          {pageItems.map(product => (
            <article
              key={product._id}
              className={classnames(classes.product__item, classes.box__part)}
            >
              <img src={product.imageUrl} alt={product.title} />
              <div className={classes.title}>
                <h3>{product.title}</h3>
              </div>

              <div className={classes.text}>
                <span>{product.description}</span>
              </div>

              <Link
                to={{ pathname: "/products", state: { id: product._id } }}
                className={classes.btn}
              >
                Details
              </Link>
            </article>
          ))}
        </div>
        <Pagination products={products} change={this.onPageChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shop: state.shop
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Shop);
