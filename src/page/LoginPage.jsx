import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import { BrowserRouter as Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

import SearchBar from '../SearchBar';
import CardList from '../CardList';
import CardList1 from '../CardList1';
import SignUp from '../SignUp';
import End from '../End';

function LoginPage() {
  let navigate = useNavigate();
  return (
    <body>
      <img className='image' src={require('../image.png')} />
      <div className='LD'>
        <button className='SU' onClick={() => navigate('/SignUp')}>
          Sign Up
        </button>
        <p className='YE'>Your Email</p>
        <input className='LGInput' />
        <p className='YE'>Your Password</p>
        <input className='LGInput' />
        <button className='SUBT'>Login</button>
      </div>
    </body>
  );
}

export default LoginPage;
