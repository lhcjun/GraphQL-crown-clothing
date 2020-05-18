import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';


const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    # from resolver
    toggleCartHidden @client    
  }
`;

const GET_CART_ITEMS = gql`{ cartItems @client }`;


const CartDropdown = ({ history }) => {
  const [ toggleCartHidden ] = useMutation(TOGGLE_CART_HIDDEN);
  const { data } = useQuery(GET_CART_ITEMS);
  const { cartItems } = data;

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          toggleCartHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  )
};

export default withRouter(CartDropdown);
