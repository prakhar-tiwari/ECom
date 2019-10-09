import React, { Component } from 'react';
import classes from './auth.module.css';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { faFacebookSquare, faGooglePlusSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faKey, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextFieldGroup from '../common/TextFieldGroup';
import axios from 'axios';

import { login } from '../../actions/authActions';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    submitForm = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(userData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.replace('/');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.replace('/home');
        }
    }

    googleAuth = () => {
        const link = document.createElement('a');
        link.href = 'http://localhost:8080/auth/google';
        link.click();
    }

    render() {
        const { errors } = this.state;
        return (
            <div className={classes.Body}>
                <div className={classnames(classes.Container, "container")}>
                    <div className="d-flex justify-content-center h-100">
                        <div className={classnames(classes.Card, "card")}>
                            <div className={classnames("card-header", classes.Cardheader)}>
                                <h3>Login</h3>
                                <div className={classnames("d-flex justify-content-end", classes.SocialIcon)}>
                                    <span><FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon></span>
                                    <span><FontAwesomeIcon onClick={this.googleAuth} icon={faGooglePlusSquare}></FontAwesomeIcon></span>
                                    <span><FontAwesomeIcon icon={faTwitterSquare}></FontAwesomeIcon></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form>
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
                                    <div className={classnames("row align-items-center", classes.remember)}>
                                        <input type="checkbox" />Remember Me
                                    </div>
                                    <div className="form-group">
                                        <button
                                            onClick={this.submitForm}
                                            type="button"
                                            className={classnames("btn float-right", classes.login_btn)}>Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className={classnames("d-flex justify-content-center", classes.links)}>
                                    Don't have an account?<Link to="/signup">Sign Up</Link>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link to="#">Forgot your password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { login })(withRouter(Login));
