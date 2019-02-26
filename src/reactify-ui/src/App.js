import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import Posts from './posts/Posts';
import PostDetail from './posts/PostDetail';


class App extends Component {
  render() {
    // BrowserRouter and Switch generan un enrutamiento por defecto en
    // este punto lo correcto es establecer una pagina de 404 not found 
    // para que cuando la app no consiga ningun router muestre esa pagina
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/posts/:slug' component={PostDetail} />
          <Route component={Posts}/>
        </Switch>  
      </BrowserRouter>
    );
  }
}

export default App;
