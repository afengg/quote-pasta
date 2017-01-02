// src/routes.js
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import About from './components/About';
import Home from './components/Home';
import Tags from './components/Tags';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
  
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="tags" component={Tags} />
      <Route path="about" component={About} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;