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

  //console.log (categories)

  useEffect(() => {}, [searchValue]);

  return (
    <div>
      
      <h1>Home</h1>

      <Col lg={2}>
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
      </Col>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Type a name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <Button
          variant="outline-secondary"
          onClick={() => dispatch(filterProductThunk(searchValue))}
        >
          Search
        </Button>
      </InputGroup>

      <Row xs={1} md={2} xl={2} className="g-4">
        {products.map((productsItem) => (
          <Col 
            key={productsItem.id}
            onClick={() => navigate(`/shop/${productsItem.id}`)}
          >
            {productsItem.title} <br />
            <img src={productsItem.productImgs} alt="" />
            {productsItem.price}
            {productsItem.products}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
