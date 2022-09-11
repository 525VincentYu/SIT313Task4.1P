import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import { BrowserRouter as Link } from 'react-router-dom';
import './LoginPage.css';

import SearchBar from '../SearchBar';
import CardList from '../CardList';
import CardList1 from '../CardList1';
import SignUp from '../SignUp';
import End from '../End';
//this is not the real login page code, Test and Test are the login and sign up page

function SignUpPage() {
  return (
    <body>
      <img className='image' src={require('../image.png')} />
      <div className='LD'>
        <p className='CR'>Create a DEV@Deakin Account </p>
        <div className='SURow'>
          <div className='NA'>Name*</div>

          <input className='SUInput'></input>
        </div>
        <div className='SURow'>
          <div className='NA'>Email*</div>

          <input className='SUInput'></input>
        </div>
        <div className='SURow'>
          <div className='NA'>Password*</div>

          <input className='SUInput'></input>
        </div>
        <div className='SURow'>
          <div className='NA'>Comfirm password*</div>

          <input className='SUInput'></input>
        </div>
        <div className='SURow'>
          <div className='NA'></div>

          <button className='SUBT'>Create</button>
        </div>
      </div>
    </body>
  );
}

export default SignUpPage;
