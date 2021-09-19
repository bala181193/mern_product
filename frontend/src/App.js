import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './form';
import List from './list';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Update from './update'
function App() {
  return (
   <Router>
      <div className="topnav">
  <a className="active">
    <Link to={'/upload'} className="nav-link">productupload</Link>
  </a>
  <a className="active">
    <Link to={'/list'} className="nav-link">productList</Link>
  </a>
</div>

<Switch>
          <Route exact path='/upload' component={ Form } />
          <Route exact path='/list' component={ List } />
          <Route exact path='/product_edit/:id' component={Update}/>
             
</Switch>
   </Router>
    );
}

export default App;
