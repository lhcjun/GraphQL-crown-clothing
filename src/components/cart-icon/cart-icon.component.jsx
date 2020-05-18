import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';


const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    # from resolver  (a function that changes cartHidden property)
    toggleCartHidden @client    
  }
`;

const GET_ITEM_COUNT =gql`{ itemCount @client }`;

const CartIcon = () => {
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
  const { data } = useQuery(GET_ITEM_COUNT);
  const { itemCount } = data;

  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  )
};

export default CartIcon;
