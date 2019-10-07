import React, { Component } from 'react';
import classes from './auth.module.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faKey, faPhone, faAddressBook, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import {signUp} from '../../actions/authActions';

library.add(faUser, faKey, faPhone, faAddressBook, faMailBulk);

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            contactNumber: 0,
            address: '',
            errors: {}
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            contactNumber: this.state.contactNumber,
            address: this.state.address,
        }
        this.props.signUp(newUser,this.props.history);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    render() {
        const {errors}=this.state;
        return (
            <div className={classes.Body}>
                <div className={classnames(classes.Container, "container")}>
                    <div className="d-flex justify-content-center h-100">
                        <div className={classnames(classes.Card, "card")}>
                            <div className={classnames("card-header", classes.Cardheader)}>
                                <h3>Sign Up</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <TextFieldGroup
                                        name="name"
                                        change={this.handleChange}
                                        type="text"
                                        placeholder="Name"
                                        error={errors.name}
                                        faIcon={faUser}
                                    />
                                    <TextFieldGroup
                                        name="email"
                                        change={this.handleChange}
                                        type="email"
                                        placeholder="Email"
                                        error={errors.email}
                                        faIcon={faMailBulk}
                                    />
                                    <TextFieldGroup
                                        name="password"
                                        change={this.handleChange}
                                        type="password"
                                        placeholder="Password"
                                        error={errors.password}
                                        faIcon={faKey}
                                    />
                                    <TextFieldGroup
                                        name="confirmPassword"
                                        change={this.handleChange}
                                        type="password"
                                        placeholder="Confirm Password"
                                        error={errors.confirmPassword}
                                        faIcon={faKey}
                                    />
                                    <TextFieldGroup
                                        name="contactNumber"
                                        change={this.handleChange}
                                        type="number"
                                        placeholder="Contact Number"
                                        error={errors.contactNumber}
                                        faIcon={faPhone}
                                    />
                                    <TextAreaFieldGroup
                                        name="address"
                                        change={this.handleChange}
                                        type="text"
                                        placeholder="Address"
                                        error={errors.address}
                                        faIcon={faAddressBook}
                                    />

                                    <div className="form-group">
                                        <button 
                                        onClick={this.submitForm.bind(this)} 
                                        type="button" 
                                        className={classnames("btn float-right", classes.login_btn)}>Sign Up</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className={classnames("d-flex justify-content-center", classes.links)}>
                                    Already have an account?<Link to="/login">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps,{signUp})(withRouter(Signup));
