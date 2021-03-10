import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/rootReducer'
// import {FirebaseDatabaseProvider} from "@react-firebase/database";
// import firebase from "firebase";
import 'firebase/database';
import {Provider} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom"; // If using Firebase database

// Firebase Config
// const config = {
//     apiKey: "AIzaSyCB9F4ITkZgbxUiZDKc5IYBBmlLE-Ca3to",
//     authDomain: "frontend-test-dav.firebaseapp.com",
//     projectId: "frontend-test-dav",
//     storageBucket: "frontend-test-dav.appspot.com",
//     messagingSenderId: "253460776469",
//     appId: "1:253460776469:web:ff7051d753dacff985301c"
// };

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
          {/*<FirebaseDatabaseProvider firebase={firebase} {...config}>*/}
          {/*    <Switch>*/}
                  <Route path="/">
                      <App />
                  </Route>
              {/*</Switch>*/}
          {/*</FirebaseDatabaseProvider>*/}
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
