import {GET_PRODUCTS,ADD_COMMENT,DELETE_COMMENT,CLEAR_COMMENTS, ADD_PRODUCT,GET_PRODUCT} from "../actions/types";


const initialState={
    products:[],
    product:{},
    comments:[]
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_PRODUCTS:
       return{
           ...state,
           products:action.payload
       }

      case ADD_PRODUCT:
      return{
          ...state,
          products:[action.payload,...state.products]
      }
      
      case CLEAR_COMMENTS:
      return{
          ...state,
          comments:action.payload
      }

      case GET_PRODUCT:
      const comments=(action.payload.comments)?action.payload.comments:[];
      return{
          ...state,
          product:action.payload,
          comments:Object.assign(comments,state.comments)
      }
    
      case ADD_COMMENT:
      const cmts=[...state.comments];
      cmts.push(action.payload);
      return{
          ...state,
          comments:cmts
      }

      case DELETE_COMMENT:
      return{
          ...state,
          comments:state.comments.filter(comment=> comment._id.toString() !== action.payload.toString())
      }

     default:
     return state;
  }
};

export default shopReducer;