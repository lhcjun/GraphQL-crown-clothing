import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { persistCache } from "apollo-cache-persist";

import { default as data } from "./graphql/initial-data";
import { default as App } from "./containers/App.container";
import { resolvers, typeDefs } from "./graphql/resolver";
import "./index.css";

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
client.writeData({ data });

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
