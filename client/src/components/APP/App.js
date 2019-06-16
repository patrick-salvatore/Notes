import React, { Component } from 'react';
import './App.scss';
import {Route, Switch} from 'react-router-dom';

// components 
import Board from '../Board/Board'
import Login from '../Login/Login'
import Register from '../Register/Register'
import PrivateRoute from '../PrivateRoute/PrivateRoute'


class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
            <PrivateRoute exact path='/' component = {Board}></PrivateRoute>
            <Route path ='/users/login' component = {Login}></Route>
            <Route path ='/users/register' component = {Register}></Route>
          </Switch>
      </div>
    );
  }
}

export default App;
