import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../utils/getConfig';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart : (state, action) => {
            const cart = action.payload
            return cart;
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig ())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .catch (error => console.log (error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

<<<<<<< HEAD
export const addCartThunk = favorite => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, favorite, getConfig())
        .then(() => dispatch(getCartThunk()))
=======
export const addCartThunk = body => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post( `https://ecommerce-api-react.herokuapp.com/api/v1/cart`, body, getConfig() )
        .then(() => dispatch( getCartThunk() ))
>>>>>>> f38276159a2e8a7fbd2fe8ff919c1d096b590799
        .finally(() => dispatch(setIsLoading(false)));
}



<<<<<<< HEAD

=======
>>>>>>> f38276159a2e8a7fbd2fe8ff919c1d096b590799
export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
