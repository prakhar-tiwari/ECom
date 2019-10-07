import React, { Component } from "react";
import { connect } from "react-redux";
import "./SearchBox.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";

class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      searchedResults: [],
      searchText: ""
    };
  }


  clearText = () => {
    this.setState({ searchText: "", searchedResults: [] });
  };

  searchResults = e => {
    // const { products } = this.props.shop;
    // var searchedResults = products.filter(product =>
    //   product.title.toLowerCase().includes(e.target.value.toLowerCase())
    // );
    // if (e.target.value === "") searchedResults = [];
    // this.setState({ searchedResults: searchedResults });
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      axios
        .post("/shop/searchproducts", {
          searchText: e.target.value
        })
        .then(products => {
          this.setState({ searchedResults: products.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const searchedList = this.state.searchedResults.map(product => (
      <Link
        onClick={this.clearText}
        to={{ pathname: "/products", state: { id: product._id } }}
        key={product._id}
      >
        {product.title}
      </Link>
    ));
    return (
      <div className="dropdown">
        <div className="dropdown-content">
          <input
            name="searchText"
            className="form-control mr-sm-2"
            onChange={this.searchResults}
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={this.state.searchText}
          />
          {searchedList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shop: state.shop
});

export default connect(mapStateToProps)(withRouter(SearchBox));
