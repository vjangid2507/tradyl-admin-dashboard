import React from 'react';
import {Navigate} from 'react-router-dom';

import {authenticationService} from '../services/authentication.service';

interface RequiredAuthProps {
  children: JSX.Element
}
const RequiredNoAuth: React.FC<RequiredAuthProps> =
({children}: RequiredAuthProps) => {
  if (!authenticationService.isLoggedIn()) {
    return children;
  }

  return <Navigate to="/" />;
};

export default RequiredNoAuth;