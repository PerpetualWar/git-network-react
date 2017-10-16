import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import routes from './router';
import 'babel-polyfill';

ReactDOM.render(routes, document.getElementById('app'));