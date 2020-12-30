import React from 'react';
import {
  RouteProps as ReactDomProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/auth';

interface RouteProps extends ReactDomProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { username } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!username ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/clients' }} />
        );
      }}
    />
  );
};

export default Route;
