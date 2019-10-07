import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import axios from 'axios';
import '../css/admin-product.module.css';

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            price: '',
            description: '',
            image: null
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleFileClick(e) {
        this.setState({ image: e.target.files[0] })
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('price', this.state.price);
        formData.append('description', this.state.description);
        formData.append('image', this.state.image);
        axios.post('/product', formData)
            .then(res => {
                console.log(res)
                this.props.history.push('/admin-product');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <form>
                            <div className="form-group input-group">
                                <input
                                    type="email"
                                    name="title"
                                    className="form-control"
                                    id="exampleInputTitle"
                                    aria-describedby="titleHelp"
                                    placeholder="Title"
                                    onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    id="exampleInputPrice"
                                    placeholder="Price"
                                    onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <input
                                    type="file"
                                    name="file"
                                    className="form-control-file"
                                    id="exampleInputFile"
                                    aria-describedby="fileHelp"
                                    onChange={this.handleFileClick.bind(this)} />
                                <small id="fileHelp" className="form-text text-muted">Upload image of the product.</small>
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    name="description"
                                    id="exampleDescription"
                                    rows="3"
                                    onChange={this.handleChange.bind(this)}></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.handleSubmit.bind(this)} >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            // <MDBContainer>
            //     <MDBRow>
            //         <MDBCol>
            //                 <form>
            //                     <p className="h5 text-center mb-4">Add a Superhero</p>
            //                     <div className="grey-text">
            //                         <MDBInput
            //                             label="Title"
            //                             name="title"
            //                             icon="user"
            //                             group
            //                             type="text"
            //                             validate
            //                             error="wrong"
            //                             success="right"
            //                             onChange={this.handleClick.bind(this)}
            //                         />
            //                         <MDBInput
            //                             label="Your email"
            //                             icon="envelope"
            //                             group
            //                             type="file"
            //                             validate
            //                             error="wrong"
            //                             success="right"
            //                             onChange={this.handleFileClick.bind(this)}
            //                         />
            //                         <MDBInput
            //                             label="Price"
            //                             name="price"
            //                             icon="tag"
            //                             group
            //                             type="number"
            //                             validate
            //                             error="wrong"
            //                             success="right"
            //                             onChange={this.handleClick.bind(this)}
            //                         />
            //                         <MDBInput
            //                             type="textarea"
            //                             name="description"
            //                             rows="2"
            //                             label="Description"
            //                             icon="pencil-alt"
            //                             onChange={this.handleClick.bind(this)}
            //                         />
            //                     </div>
            //                     <div className="text-center">
            //                         <MDBBtn onClick={this.handleSubmit.bind(this)} outline color="secondary">
            //                             Send <MDBIcon far icon="paper-plane" className="ml-1" />
            //                         </MDBBtn>
            //                     </div>
            //                 </form>
            //         </MDBCol>
            //     </MDBRow>
            // </MDBContainer>
        )
    }
}

export default AddProduct;
