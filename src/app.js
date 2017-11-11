import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { routes } from './router';

ReactDOM.render(routes, document.getElementById('app'));