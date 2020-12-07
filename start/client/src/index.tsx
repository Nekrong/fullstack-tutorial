import {
    ApolloClient,
    NormalizedCacheObject,
    ApolloProvider,
    gql,
    useQuery
} from '@apollo/client';
import Login from './pages/login';
import { cache } from './cache';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;


// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: localStorage.getItem('token') || '',
    },
    typeDefs,
});


injectStyles();
// Pass the ApolloClient instance to the ApolloProvider component
ReactDOM.render(
    <ApolloProvider client={client}>
        <Pages />
    </ApolloProvider>,
    document.getElementById('root')
);


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <Pages /> : <Login />;
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <IsLoggedIn />
    </ApolloProvider>,
    document.getElementById('root')
);

