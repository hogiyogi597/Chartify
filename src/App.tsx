import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ProvideAuth, useAuth } from './hooks/use-auth';
import Home from './components/home/Home';
import LoginRedirect from './components/authentication/LoginRedirect';
import AuthHandler from './components/authentication/AuthHandler';
import { ProvideSpotify } from './hooks/use-spotify';
import { ChakraProvider } from '@chakra-ui/core';
import theme from './theme'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ProvideSpotify>
        <ProvideAuth>
          <Router>
            <Switch>
              <Route path="/login">
                <LoginRedirect />
              </Route>
              <Route path="/auth">
                <AuthHandler />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </ProvideAuth>
      </ProvideSpotify>
    </ChakraProvider>
  );
}

export default App;
