import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import "../styles/slide.css";
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, } from '@apollo/client';
import { StoreContext } from '../src/StoreContext';
import { useEffect } from 'react'
import { firebaseCloudMessaging } from "../utils/webPush";
import fetch from 'cross-fetch';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [storeIdGlobal, setStoreIdGlobal] = useState("");
  const [userEmailGlobal,setUserEmailGlobal]=useState("")
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`GraphQL error ${message}`);
      });
    }
  })
  const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:5000/graphql",fetch }),
  ]);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setStoreIdGlobal(localStorage.getItem("storeId"));
    setUserEmailGlobal(localStorage.getItem("emailId"));
  }, []);

  let globalTheme = responsiveFontSizes(theme);

  function getMessage() {
    console.log('message functions')
    const messaging = firebase.messaging()
    messaging.onMessage((message) => console.log('foreground', message))
  }

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap" rel="stylesheet"></link>
      </Head>
      <ThemeProvider theme={globalTheme}>
        {" "}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={client}>
          <StoreContext.Provider value={{ storeIdGlobal, setStoreIdGlobal ,userEmailGlobal,setUserEmailGlobal}}>
            <Component {...pageProps} />
          </StoreContext.Provider>
        </ApolloProvider>;
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};