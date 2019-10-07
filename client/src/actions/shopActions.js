import axios from "axios";
import {
  GET_PRODUCTS,
  ADD_COMMENT,
  CLEAR_COMMENTS,
  GET_PRODUCT,
  DELETE_COMMENT
} from "./types";

export const getProducts=()=>dispatch=>{
  axios
      .get("/shop/getproducts")
      .then(products => {
        dispatch({
          type:GET_PRODUCTS,
          payload:products.data
        })
      })
      .catch(err => {
        console.log(err);
      });
}

export const getProduct = id => dispatch => {
  axios.get("/shop/getproduct/" + id).then(result => {
    var product;
    if (result.data.length) {
      // check if array
      product = result.data[0];
    } else {
      product = result.data;
    }
    const addProduct = {
      title: product.title,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      rating: product.rating,
      comments: product.comments
    };
    dispatch({
      type: CLEAR_COMMENTS,
      payload: []
    });
    dispatch({
      type: GET_PRODUCT,
      payload: addProduct
    });
  });
};

export const addComment = (id, text) => dispatch => {
  axios
    .post("/shop/comment", {
      id: id,
      text: text
    })
    .then(savedComment => {
      dispatch({
        type: ADD_COMMENT,
        payload: savedComment.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteComment = commentId => dispatch => {
  axios
    .post("/shop/deletecomment", {
      id: commentId
    })
    .then(deletedComment => {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId
      });
    })
    .catch(err => {
      console.log(err);
    });
};
