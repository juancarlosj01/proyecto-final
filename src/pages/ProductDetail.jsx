import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../slices/cart.slice';
import { getProductThunk } from '../slices/products.slice';

const ProductDetail = () => {


  const allProducts = useSelector(state => state.products);
  const [productDetail, setProductDetail] = useState({});
  const [suggestedProduct, setSuggestedProduct] = useState([])
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductThunk())
  }, [])

  useEffect(() => {
    const productFind = allProducts.find(productItem => productItem.id === Number(id))
    setProductDetail(productFind);

    const filteredProducts = allProducts.filter(productItem =>
      productItem.category.id === productFind?.category.id
    )
    setSuggestedProduct(filteredProducts)
  }, [allProducts, id])



  const addToCart = () => {
    alert("Añadido al carrito");

    const body = {
      id: productDetail.id,
      quantity: Number(quantity)
    };

    dispatch(addCartThunk(body))
    setQuantity(1)

  };


  return (
    <div>
      <h1>{productDetail?.title}</h1>
      <div>
        <div>
          <h5>Add to cart </h5>
        </div>
        <p>{quantity}</p>
        <Button
          onClick={() => setQuantity(quantity - 1)}
          variant="outline-secondary"
          id="button-addon2"
          disabled={quantity === 1} >
          -
        </Button>
        <Button
          onClick={() => setQuantity(quantity + 1)}
          variant="outline-secondary"
          id="button-addon2"
        >
          +
        </Button>

        <Button
          onClick={addToCart}
          variant="outline-secondary"
          id="button-addon2"
        >
          Add
        </Button>

        <h5>Total: {quantity * productDetail?.price}</h5>

      </div>

      <img src={productDetail?.productImgs} style={{ width: "350px" }} />
      <p>{productDetail?.description}</p>
      {
        suggestedProduct.map((products) => (
          <li onClick={() => navigate(`/shop/${products?.id}`)} key={products.id}>
            {products.title}</li>
        ))
      }
    </div>
  );
};

export default ProductDetail;