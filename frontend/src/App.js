import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'

//containers
import Home from './containers/Home/Home'
import Connexion from './containers/Connexion/Connexion'
import UpdateProfil from './containers/UpdateProfil/UpdateProfil'

const App = () => {
  

  let routes;


  routes = (
    <Switch>
        <Route exact path='/' component={Connexion} />
        <Route exact path='/profil' component={UpdateProfil} />
        <Route exact path='/home' component={Home} />
    </Switch>
  )
  

  return (
        routes
  );
  
}



export default (App);
