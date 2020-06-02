import React from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from '../services/loginService';
import MapContextContainer from '../context/mapContext/mapContextContainer';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate('/app/login');
    return null;
  }

  return (
    <MapContextContainer>
      <Component {...rest} />
    </MapContextContainer>
  );
};

export default PrivateRoute;
