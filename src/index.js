import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
 
var destination = document.querySelector("#container");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  destination
);

