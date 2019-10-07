import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../reviews/Comment";
import {deleteComment} from '../../../actions/shopActions';

class Comments extends Component {
  onDeleteClick=(commentId)=> {
    this.props.deleteComment(commentId);
  }
  render() {
    return this.props.shop.comments.map(comment =>( 
      <Comment
      key={comment._id} 
      delete={this.onDeleteClick} 
      comment={comment}
       auth={this.props.auth} 
      />
    ));
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop
});

export default connect(mapStateToProps,{deleteComment})(Comments);
