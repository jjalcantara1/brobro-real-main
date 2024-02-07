import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions'; 
import { loadShippingAddress } from '../actions/cartActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';



function ShippingScreen({ history }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = useSelector(state => state.cart);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
  
    const navigate = useNavigate();



    useEffect(() => {
        const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
          ? JSON.parse(localStorage.getItem('shippingAddress'))
          : {};
        
        setAddress(shippingAddressFromStorage.address || '');
        setCity(shippingAddressFromStorage.city || '');
        setPostalCode(shippingAddressFromStorage.postalCode || '');
        setCountry(shippingAddressFromStorage.country || '');
      }, []);
    
      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
      };
      const nextStep = () => {
          navigate('/payment');
      }

      return (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <h1>Shipping Address</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Button variant="secondary" onClick={submitHandler} className="ml-2">
                  Continue
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }

export default ShippingScreen;
