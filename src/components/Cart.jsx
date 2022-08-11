import React, { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCart, getCartThunk } from "../slices/cart.slice";

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch ()
    const cartSelected = useSelector ((state) => state.cart);
    const navigate = useNavigate();

//    console.log(cartSelected)

    useEffect (() => {
        dispatch (getCartThunk());

    }, [])

    const getTotal = (products)=> {
      let total = 0
      products.forEach( item =>{
        total += item.price * Number(item.productsInCart.quantity)
      } )
      return total
    }

  return (
    
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <h4>Total: {()=>getTotal( cartSelected )}</h4>
        <Offcanvas.Body>
        <Button onClick={() => dispatch(buyCart())}>
          Buy cart
        </Button>
          
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
