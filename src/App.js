import React from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './pages/Home';
import ReactTest from './pages/ReactTest';
import NoMatch from './pages/NoMatch';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/react" component={ReactTest}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;