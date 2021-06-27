import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/html/Header';
import Footer from './components/html/Footer';
import ReactRouter from './components/react_router/ReactRouter';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}



ReactDOM.render(<Header />, document.getElementById('title'));
ReactDOM.render(
  <BrowserRouter>
    <ReactRouter />
  </BrowserRouter>
  , document.getElementById('root')
);
ReactDOM.render(<Footer />, document.getElementById('footer'));