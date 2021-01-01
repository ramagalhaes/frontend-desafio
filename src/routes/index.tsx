import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import Cadastrar from '../pages/CreateClient';
import Atualizar from '../pages/updateClient';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/clients" component={Clients} isPrivate />
    <Route path="/cadastro" component={Cadastrar} isPrivate />
    <Route path="/atualizar" component={Atualizar} isPrivate />
  </Switch>
);

export default Routes;
