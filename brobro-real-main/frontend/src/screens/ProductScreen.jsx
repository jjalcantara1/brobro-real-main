import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { useNavigate} from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Grid,
  Divider,
  Button,
} from "@mui/material";


function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);


const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
};

  useEffect(() => {
  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/products/${id}`);
    setProduct(data)
  }

  fetchProduct();
}, [id]);

const handleGoToShipping= () => { 
  navigate('/cart');
}

  return (
    <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>

      <Col md={3}>
        <ListGroup variant='flush'>
            <ListGroupItem>
                <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
                {product.description}
            </ListGroupItem>
            <ListGroupItem>
                <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={'#f8e825'}
                    />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
            <ListGroup variant = "flush">
                <ListGroup.Item>
                    <Row>
                        <Col>Availability:</Col>
                        <Col>
                            {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                        </Col>
                    </Row>
                </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <ListItem>
                        <Grid container spacing={0}>
                          <Grid item xs={6} sm={6} className="py-2">
                            Qty:
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12}>
                            {/* Adjust the grid item size as needed */}
                            <Button
                              onClick={addToCartHandler}
                              disabled={product.countInStock === 0}
                              fullWidth
                              size="large"
                              style={{ borderRadius: "20px" }}
                              color="secondary"
                              variant="contained"
                            >
                              Add To Cart
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                            <Button 
                            onClick={handleGoToShipping}
                            className="btn-block"
                            type="button"
                            disabled={product.countInStock === 0}
                        >
                            Checkout
                        </Button>
                        </Row>
                    </ListGroup.Item>
            </ListGroup>

        </Card>
        
      </Col>

      <Link to="/" className='btn btn-light my-3'>
        Go Back
      </Link>
    </Row>
  );
}

export default ProductScreen;
