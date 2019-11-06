import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Character from '~/pages/Character';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Character} />
    </Switch>
  );
}
