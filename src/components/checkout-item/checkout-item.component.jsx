import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './checkout-item.styles.scss';

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) { # AddItemToCart from resolver > typeDefs
    addItemToCart(item: $item) @client   # addItemToCart from resolvers > Mutation
  }
`;

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;


const CheckoutItem = ({ cartItem }) => {
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
  const [clearItemFromCart] = useMutation(CLEAR_ITEM_FROM_CART);
  const { name, imageUrl, price, quantity } = cartItem;
  const item = cartItem;   // for variables  (if addItemToCart({ variables: {cartItem} }) => undefined)
  
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => removeItemFromCart({ variables: {item} })}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItemToCart({ variables: {item} })}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItemFromCart({ variables: {item} })}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
