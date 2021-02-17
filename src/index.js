import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import App from './App';
import App from './router/router';
import reportWebVitals from './reportWebVitals';
 
var destination = document.querySelector("#container");

ReactDOM.render(
  <React.StrictMode>
    <App />
    <h1> ESTOY 0.1.1</h1>
  </React.StrictMode>,
  destination
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
