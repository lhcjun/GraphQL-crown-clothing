import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { persistCache } from "apollo-cache-persist";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";
import { resolvers, typeDefs } from "./graphql/resolver";

// connect backend
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

const cache = new InMemoryCache();

// Set up cache persistence
persistCache({
  cache,
  storage: window.localStorage,
});

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

// write data into client when initializing app
client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
