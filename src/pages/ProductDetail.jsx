import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductThunk } from '../slices/products.slice';

const ProductDetail = () => {


    const allProducts = useSelector (state => state.products);
    const [productDetail, setProductDetail] = useState ({});
    const [suggestedProduct, setSuggestedProduct] = useState ([])

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
    


    return (
        <div>
            <h1>{productDetail?.title}</h1>
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