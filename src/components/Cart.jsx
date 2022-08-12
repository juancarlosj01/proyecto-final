import React, { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCart, getCartThunk } from "../slices/cart.slice";

const Cart = ({ show, handleClose }) => {

  const dispatch = useDispatch()
  const cartSelected = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartThunk());

  }, [])

  const getTotal = (products) => {
    let total = 0
    products.forEach(item => {
      total += item.price * Number(item.productsInCart.quantity)
    })
    return total
  }

  return (

    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {cartSelected.map((cart) => (
            <li onClick={() => navigate(`/shop/${cart.id}`)} key={cart.id}>
              {cart.title}
            </li>
          ))}
        </ul>
        <hr />
        <h5>Total: {() => getTotal(cartSelected)}</h5>
        <hr />
        <Button onClick={() => dispatch(buyCart())}>
          Buy cart
        </Button>
      </Offcanvas.Body>
    </Offcanvas>

  );
};

export default Cart;
