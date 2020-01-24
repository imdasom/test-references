//react library
import React from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
//3rd party library
// import hljs from 'highlight.js/lib/highlight';
// import javascript from 'highlight.js/lib/languages/javascript';
// import 'highlight.js/styles/androidstudio.css';
// hljs.registerLanguage('javascript', javascript);
//project component
import ReactTest from './pages/ReactTest';
import NoMatch from './pages/NoMatch';
//style
import './style/main.css';

const App = () => {
  return (
    <Router basename="/tdd">
      <div>
        <Switch>
          <Route exact path="/" component={ReactTest}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;