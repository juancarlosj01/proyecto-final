import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk, filterProductThunk, getProductThunk } from "../slices/products.slice";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  InputGroup,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductThunk());

    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => { }, [searchValue]);

  return (
    <div className="home-container">
      <div className="category-box">
        <span>Category</span><hr />
        <div>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>


      <div>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Type a name"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(filterProductThunk(searchValue))}>
            Search
          </Button>
        </InputGroup>

        <div className="product-container">
          {products.map((productsItem) => (

            productsItem.id !== 11 && productsItem.id !== 6 ?
            <div className="product-box"
              key={productsItem.id}
              onClick={() => navigate(`/shop/${productsItem.id}`)}>
              <img src={productsItem.productImgs} alt="image" />
              <div>
                {productsItem.title} <br />
                {productsItem.price} <br />
                {productsItem.products}
              </div>
            </div>
            :
            <div></div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
