import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../slices/cart.slice';
import { getProductThunk } from '../slices/products.slice';

const ProductDetail = () => {


    const allProducts = useSelector (state => state.products);
    const [productDetail, setProductDetail] = useState ({});
    const [suggestedProduct, setSuggestedProduct] = useState ([])
    const [quantity, setQuantity] = useState("");

    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductThunk())
    },[])

    useEffect (() => {
        const productFind = allProducts.find(productItem => productItem.id === Number(id))
        setProductDetail(productFind);
        
        const filteredProducts = allProducts.filter (productItem => 
            productItem.category.id === productFind?.category.id
            )
            setSuggestedProduct(filteredProducts)
    }, [allProducts, id])
    


    const addToCart = () => {
        alert("Añadido al carrito");
        const favorite = {
          product: productDetail.id,
          quantity
        }
        dispatch(addCartThunk(favorite))
        console.log(favorite);
      };


    return (
        <div>
            <h1>{productDetail?.title}</h1>

            <div>
        <h5>Add to cart</h5>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Quantity"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button
            onClick={addToCart}
            variant="outline-secondary"
            id="button-addon2"
          >
            Add
          </Button>
        </InputGroup>
      </div>

            <img src={productDetail?.productImgs} style={{width: "350px"}} />
            <p>{productDetail?.description}</p>
            {
                suggestedProduct.map ((products) => (
                <li onClick={() => navigate(`/shop/${products?.id}`)} key={products.id}>
                    {products.title}</li>
                    ))
            }
        </div>
    );
};

export default ProductDetail;