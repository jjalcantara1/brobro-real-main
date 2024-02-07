import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions'; 
import { loadShippingAddress } from '../actions/cartActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
        navigate('/payment');
      };
      
    return (
        <form onSubmit={submitHandler}>
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            <button type="submit">Continue</button>
        </form>
    );
}

export default ShippingScreen;
