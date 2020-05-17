import { gql } from 'apollo-boost';

// define scheme (type)
export const typeDefs = gql`
    extend type Mutation {
        #type def
        ToggleCartHidden: Boolean!      
    }
`;

// read initial value from cache
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client  #client directive = ask for local cache
    }
`;

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
        }
    }
};

