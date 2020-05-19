import { gql } from 'apollo-boost';
import { addItemToCart, getCartItemCount, getCartTotalPrice, removeItemFromCart , clearItemFromCart } from './cart.utils';

// define scheme (type)
export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type DateTime {  # reference from firebase res
        nanoseconds: Int!
        seconds: Int!
    }

    extend type User {
        id: ID!
        displayName: String!
        email: String!
        createdAt: DateTime!
    }

    extend type Mutation {
        #type def
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!) : [Item]!
        RemoveItemFromCart(item: Item!) : [Item]!
        ClearItemFromCart(item: Item!) : [Item]!
        SetCurrentUser(user: User!): User!
    }
`;

// read initial value from cache
const GET_CART_HIDDEN = gql`{ cartHidden @client }`;  // client directive = ask for local cache
const GET_CART_ITEMS = gql`{ cartItems @client }`;
const GET_ITEM_COUNT = gql`{ itemCount @client }`;
const GET_CART_TOTAL_PRICE = gql`{ cartTotalPrice @client }`;
const GET_CURRENT_USER = gql`{ currentUser @client }`;


const cartItemsRelatedUpdate = (cache, newCartItems) => {
    cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
    });

    cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
    });

    cache.writeQuery({
        query: GET_CART_TOTAL_PRICE,
        data: { cartTotalPrice: getCartTotalPrice(newCartItems) }
    });
};

// Apollo has access to resolver on client side cache
export const resolvers = {
    Mutation: {
        // actual mutation def      (_root, _args, _context, _info)
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });
        
            // update cache
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);  // return new array
            cartItemsRelatedUpdate(cache, newCartItems);

            return newCartItems;
        },

        removeItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = removeItemFromCart(cartItems, item);  // array
            cartItemsRelatedUpdate(cache, newCartItems);
            
            return newCartItems;
        },

        clearItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = clearItemFromCart(cartItems, item);  //array
            cartItemsRelatedUpdate(cache, newCartItems);

            return newCartItems;
        },

        setCurrentUser: (_root, { user }, { cache }) => {
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user }
            });

            return user;
        }
    }
};

