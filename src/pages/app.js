import React from 'react';
import { Router } from '@reach/router';
import MainLayout from '../layouts/mainLayout';
import LoginPage from '../components/Pages/login';
import IndexPage from '../components/Pages/index';
import PrivateRoute from '../components/privateRoute';

const App = () => (
  <MainLayout>
    <Router>
      <PrivateRoute path="/app/index" component={IndexPage} />
      <LoginPage path="/app/login" />
    </Router>
  </MainLayout>
);
export default App;
