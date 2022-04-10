import React from 'react';
import {Navigate} from 'react-router-dom';

import {authenticationService} from '../services/authentication.service';

interface RequiredAuthProps {
  children: JSX.Element
}
const RequiredAuth: React.FC<RequiredAuthProps> =
({children}: RequiredAuthProps) => {
  // console.log("It required auth");
  if (authenticationService.isLoggedIn()) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default RequiredAuth;
