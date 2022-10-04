import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import { Route } from 'react-router-dom';
import '../App.css';

import SearchBar from '../SearchBar';
import CardList from '../CardList';
import CardList1 from '../CardList1';
import SignUp from '../SignUp';
import End from '../End';
import bac from '../bac.mp4';
import Nav from 'react-bootstrap/Nav';

function HomePage() {
  return (
    <body>
      <video
        src={bac}
        autoPlay
        loop
        muted
        style={{
          marginBottom: '-5px',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <video
        src={bac}
        autoPlay
        loop
        muted
        style={{
          marginBottom: '-5px',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <video
        src={bac}
        autoPlay
        loop
        muted
        style={{
          marginBottom: '-5px',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div className='content'>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Nav>
            <Nav.Item>
              <Nav.Link href='/Plan'>Plans</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-1'>Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-2'>Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='disabled' disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <SearchBar />

        <SignUp />

        <End />
      </div>
    </body>
  );
}

export default HomePage;
