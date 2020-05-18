import { gql } from 'apollo-boost';
import { addItemToCart, getCartItemCount } from './cart.utils';

// define scheme (type)
export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        #type def
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!) : [Item]!     
    }
`;

// read initial value from cache
const GET_CART_HIDDEN = gql`{ cartHidden @client }`;  // client directive = ask for local cache
const GET_CART_ITEMS = gql`{ cartItems @client }`;
const GET_ITEM_COUNT = gql`{ itemCount @client }`;


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

            const newCartItems = addItemToCart(cartItems, item);

            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: { itemCount: getCartItemCount(newCartItems) }
            })

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        }
    }
};

