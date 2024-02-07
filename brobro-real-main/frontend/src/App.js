import React from 'react';
import Header from './components/Header';
import {Container} from 'react-bootstrap';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import LoginScreen from './screens/LoginScreen';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<LoginScreen/>} exact />
            <Route path='/product/:id' element={<ProductScreen/>}  />
            <Route path='/cart' element={<CartScreen/>}  />
            <Route path='/shipping' element={<ShippingScreen/>}  />
            <Route path='/home' element={<HomeScreen/>} />

          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
