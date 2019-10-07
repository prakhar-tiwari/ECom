import axios from 'axios';
import {GET_CART} from './types';

export const getCart=()=>dispatch=>{
    axios.get("/shop/getcart")
    .then(cart=>{
        dispatch({
            type:GET_CART,
            payload:cart.data
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addToCart=(id,history)=>dispatch=>{
    axios.post("/shop/add-to-cart/"+id)
    .then(result=>{
        dispatch({
            type:GET_CART,
            payload:result.data
        })
        history.push('/cart');
    })
    .catch(err=>{
        console.log(err.response)
    })
}

export const deleteItemFromCart=(id)=>dispatch=>{
    axios.post("/shop/removeitem",{
        id:id
    })
    .then(result=>{
        dispatch({
            type:GET_CART,
            payload:result.data
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

export const updateItem=(id,qty)=>dispatch=>{
    axios.post('/shop/updateitem',{
        id:id,
        qty:qty
    })
    .then(result=>{
        dispatch({
            type:GET_CART,
            payload:result.data
        })
    })
    .catch(err=>{
        console.log(err)
    })
}