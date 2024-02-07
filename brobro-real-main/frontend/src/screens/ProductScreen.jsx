import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';


function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState([])
  const dispatch = useDispatch();

  const qty = 1

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
                            <Button 
                                onClick={addToCartHandler}
                                className="btn-block"
                                type="button"
                                disabled={product.countInStock === 0}
                            >
                                Add to Cart
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
