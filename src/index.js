import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SearchBar from './SearchBar';
import CardList from './CardList';
import CardList1 from './CardList1';
import SignUp from './SignUp';
import End from './End';

ReactDOM.render(
  <body>
    <SearchBar />
    <div>
      <img className='image' src={require('./image.png')} />
    </div>
    <p className='feature'>Featured Acticles</p>
    <CardList />
    <button className='pl'>See all articles</button>
    <p className='feature'>Featured Tutorials</p>
    <CardList1 />
    <button className='pl'>See all tutortials</button>
    <SignUp />
    <End />
  </body>,

  document.getElementById('root')
);
