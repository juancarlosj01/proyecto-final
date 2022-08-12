import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../slices/cart.slice';

const Purchases = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {
                    cart.map(cart => (
                        <li key={cart.id}>{cart.title} </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;