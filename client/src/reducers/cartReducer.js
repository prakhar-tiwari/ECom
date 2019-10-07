import {GET_CART,REMOVE_ITEM} from '../actions/types';

const initalState={
    cart:{}
}

const cartReducer=(state=initalState,action)=>{
    switch(action.type){
        case GET_CART:
        console.log(action.payload)
        return{
            ...state,
            cart:action.payload
        }

        default:
        return{
            ...state
        }
    }
}

export default cartReducer;