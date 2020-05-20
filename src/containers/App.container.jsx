import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import App from './App';


const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const GET_CURRENT_USER = gql`{ currentUser @client }`;


const AppContainer = () => {
    const [setCurrentUser] = useMutation(SET_CURRENT_USER);

    const { data } = useQuery(GET_CURRENT_USER);
    const { currentUser } = data;

    return(
        <App
            currentUser={currentUser}
            setCurrentUser={user => {
              setCurrentUser({ variables: { user } });
            }}
        />
    )
}

export default AppContainer;