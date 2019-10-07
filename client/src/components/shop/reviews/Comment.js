import React, { Component } from 'react'

class Comment extends Component {
  render() {
    const { text, user,_id } = this.props.comment;
    const { auth } = this.props;
    return (
        <div key={_id} className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="#">
              <img
                className="rounded-circle d-none d-md-block"
                src="images/batman-bg.jpg"
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{user.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{text}</p>
            {user._id === auth.user.id ? (
              <button
                onClick={this.props.delete.bind(this,_id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;
