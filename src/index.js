import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/rootReducer'
import 'firebase/database';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppWithData from "./components/AppWithData";
import NotFound from "./components/NotFound";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
                  <Switch>
                      <Route path="/search"  >
                          <AppWithData/>
                      </Route>
                      <Route exact path="/"   >
                          <App/>
                      </Route>
                      <Route path='/' >
                          <NotFound/>
                      </Route>
                  </Switch>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
