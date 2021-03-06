import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Masks from './components/Masks';


function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
              <Route exact path="/">
                <Masks />
              </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
