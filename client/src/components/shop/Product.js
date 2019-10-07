import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import classes from "../css/product.module.css";
import Comments from "./reviews/Comments";
import CommentForm from "./reviews/CommentForm";
import { getProduct } from "../../actions/shopActions";
import { addToCart } from "../../actions/cartActions";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      description: "",
      imageUrl: "",
      rating: [],
      comments: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state.id !== prevProps.location.state.id) {
      const { id } = this.props.location.state;
      this.props.getProduct(id);
    }
  }

  componentDidMount() {
    const { id } = this.props.location.state;
    this.props.getProduct(id);
  }

  addToCart = () => {
    const { id } = this.props.location.state;
    this.props.addToCart(id, this.props.history);
  };

  render() {
    const { product } = this.props.shop;
    const { title, price, description, imageUrl, rating, comments } = product;
    var totalReviews = comments ? comments.length : 0;
    var totalRatings = 0;
    var averageRating = 0;
    var averageRatingPercentage = 0;
    if (rating && rating.length > 0) {
      // Finding average of ratings
      var rateArray = rating.map(rating => {
        return rating.rate;
      });
      const sortedRating = rateArray.sort();
      var resultRate = {};
      for (var i = 0; i < sortedRating.length; i++) {
        if (!resultRate[sortedRating[i]]) {
          resultRate[sortedRating[i]] = 0;
        }
        ++resultRate[sortedRating[i]];
      }
      var totalRatings = sortedRating.length;
      var weightedSum = 0;
      Object.keys(resultRate).map(object => {
        weightedSum += object * resultRate[object];
      });
      var averageRating = weightedSum / totalRatings;
      averageRating = Math.round(averageRating * 10) / 10; // obtaining the rating upto one decimal digit
      var averageRatingPercentage = (averageRating / 5) * 100;
    }
    return (
      <div className="container">
        <div className="card">
          <div className="container-fluid">
            <div className={classnames(classes.wrapper, "row")}>
              <div className={classnames(classes.preview, "col-md-6")}>
                <div
                  className={classnames(
                    classes.preview_pic,
                    classes.tab_content
                  )}
                >
                  <div className={classnames("tab-pane active")} id="pic-1">
                    <img src={imageUrl} />
                  </div>
                </div>
              </div>
              <div className={classnames(classes.details, "col-md-6")}>
                <h3 className={classes.product_title}>{title}</h3>
                <div className={classes.rating}>
                  <div className="stars">
                    <div className={classes.starsOuter}>
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <div
                        style={{ width: averageRatingPercentage + "%" }}
                        className={classes.starsInner}
                      >
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                      </div>
                    </div>
                    <p className={classes.averageRating}>
                      {averageRating} out of 5
                    </p>
                  </div>
                  <span className={classes.totalRatings}>
                    {totalReviews} reviews
                  </span>
                </div>
                <div className={classes.product_description}>{description}</div>
                <h4 className={classes.price}>
                  current price: <span>{price}</span>
                </h4>
                <p className={classes.vote}>
                  <strong>{averageRatingPercentage}%</strong> of buyers enjoyed
                  this product! <strong>({totalRatings} ratings)</strong>
                </p>
                <h5 className={classes.sizes}>
                  sizes:
                  <span
                    className={classes.size}
                    data-toggle={classes.tooltip}
                    title="small"
                  >
                    s
                  </span>
                  <span
                    className={classes.size}
                    data-toggle={classes.tooltip}
                    title="medium"
                  >
                    m
                  </span>
                  <span
                    className={classes.size}
                    data-toggle={classes.tooltip}
                    title="large"
                  >
                    l
                  </span>
                  <span
                    className={classes.size}
                    data-toggle={classes.tooltip}
                    title="xtra large"
                  >
                    xl
                  </span>
                </h5>
                <div className={classes.action}>
                  <button
                    className={classnames(
                      classes.add_to_cart,
                      "btn btn-default"
                    )}
                    type="button"
                    onClick={this.addToCart}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommentForm id={this.props.location.state.id} />
        {comments ? <Comments comments={comments} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop
});

export default connect(
  mapStateToProps,
  { getProduct, addToCart }
)(withRouter(Product));
