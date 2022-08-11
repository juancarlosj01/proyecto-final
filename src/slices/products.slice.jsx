import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProduct: (state, action) => {
            const product = action.payload
            return product
        }
    }
})


export const getProductThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
        .then(res => dispatch(setProduct(res.data?.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}


export const filterProductThunk = (searchValue) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchValue}`)
        .then(res => dispatch(setProduct(res.data?.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterCategoryThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
      .then((res) => dispatch(setProduct(res.data?.data.products)))
      .finally(() => dispatch(setIsLoading(false)));

}


export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;
