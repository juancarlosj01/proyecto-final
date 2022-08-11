import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartThunk } from "../slices/cart.slice";

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch ()
    const cartSelected = useSelector ((state) => state.cart);
    const navigate = useNavigate();

//    console.log(cartSelected)

    useEffect (() => {
        dispatch (getCartThunk());

    }, [])


  return (
    
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>My cart.

        <ul>
          {cartSelected.map((cart) => (
            <li onClick={() => navigate(`/shop/${cart.id}`)} key={cart.id}>
                {cart.title}   
            </li>
          ))}
          </ul>

        </Offcanvas.Body>
      </Offcanvas>

  );
};

export default Cart;
