import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Connexion from './components/Connexion/Connexion'
import Profil from './components/Profil/Profil'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Reducers/rootReducer';
import { loadState, saveState } from './localStorage'

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState(store.getState())
})
const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Connexion} />
        <Route exact path='/profil' component={Profil} />
        <Route exact path='/home' component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(
  <Root />, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//import { Redirect } from 'react-router-dom'
//react dom
