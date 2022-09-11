import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import { Route } from 'react-router-dom';

import SearchBar from '../SearchBar';
import CardList from '../CardList';
import CardList1 from '../CardList1';
import SignUp from '../SignUp';
import End from '../End';

function HomePage() {
  return (
    <body>
      <SearchBar />

      <SignUp />

      <End />
    </body>
  );
}

export default HomePage;
