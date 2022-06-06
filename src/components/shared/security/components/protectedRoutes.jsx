import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NotConnected } from './notConnected';
import { Unauthorized } from './unauthorized';

export const ProtectedRoutes = ({ children, authorization }) => {
  const { user } = useSelector((state) => state.userReducer);
  const history = useHistory();
  if (new Date().getTime() > new Date(user.nextAuthDate)) {
    history.push('/login');
  }
  if (!user.authentifie) {
    return <NotConnected />;
  } else if (user.roles?.includes(authorization)) {
    console.log(user.roles.includes(authorization));
    console.log(user.authentifie);
    console.log(user.roles);
    return <> {children} </>;
  } else if (user.roles?.includes('Laborantin')) {
    console.log(user.roles.includes(authorization));
    console.log(user.authentifie);
    console.log(user.roles);
    return <> {children} </>;
  } else {
    // console.log(user.roles);
    console.log(user.authentifie);
    console.log(authorization);
    console.log(user.roles.includes(authorization));
    return <Unauthorized />;
  }
};
