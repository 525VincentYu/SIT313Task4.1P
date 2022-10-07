import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import C3 from './components/C3';

import { Route } from 'react-router-dom';

import SearchBar from './SearchBar';
import CardList from './CardList';
import CardList1 from './CardList1';
import SignUp from './SignUp';
import End from './End';

ReactDOM.render(<App />, document.getElementById('root'));

C3();
