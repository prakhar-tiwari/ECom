import React, { Component } from 'react';
import classes from './Navigation.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import SearchBox from '../SearchBox';

class NavigationMenu extends Component {

    logoutHandler = e => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li> */}
                    {/* <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-product">Add Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin-product">Admin Product</Link>
                    </li>
                </ul>
                    <SearchBox/>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item order-md-last">
                        <a href="" onClick={this.logoutHandler} className="nav-link" >Logout</a>
                    </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
        );

        const guestLinks = (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Shop</Link>
                    </li>
                </ul>
                {this.props.shop.products?<SearchBox/>:null}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item order-md-last">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        );
        return (
            <nav className={classes.Navigation + " navbar navbar-expand-lg navbar-dark"}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                {isAuthenticated ? authLinks : guestLinks}
            </nav>
        );
    }
}

const mapstateToProps = state => ({
    auth: state.auth,
    shop:state.shop
})

export default connect(mapstateToProps, { logout })(NavigationMenu)
