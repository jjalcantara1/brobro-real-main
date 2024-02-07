import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_LOAD_SHIPPING_ADDRESS } from "../constants/cartConstants";


export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
      type: CART_ADD_ITEM,
      payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty
      }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
      type: CART_REMOVE_ITEM,
      payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch, getState) => {
  dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));

  const { userLogin: { userInfo } } = getState();
  await axios.post('/api/save-shipping/', { ...data, user: userInfo._id });
};

// export const loadShippingAddress = () => async (dispatch, getState) => {
//   try {
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     if (!userInfo) {
    
//       return;
//     }


//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(`/api/users/${userInfo._id}/shipping/`, config);

//     dispatch({
//       type: CART_LOAD_SHIPPING_ADDRESS,
//       payload: data,
//     });
//   } catch (error) {
//     console.error('Error loading shipping address:', error.message);
//   }
// };

export const loadShippingAddress = () => (dispatch) => {
  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

  dispatch({
    type: CART_LOAD_SHIPPING_ADDRESS,
    payload: shippingAddressFromStorage,
  });
  };