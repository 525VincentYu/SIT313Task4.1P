import React, { useState } from 'react';
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
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function HomePage() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  //logout
  async function handleLogout(e) {
    e.preventDefault();
    setError('');

    try {
      logout();
      navigate('../', { replace: true });
    } catch {
      setError('Failed to log out');
    }
  }
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
        <div
          style={{ paddingTop: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => navigate('/Plan')}>Plans</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate('/PostVideo')}>
                post Video
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate('/Chat')}>Chat</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate('/ss')}>
                See Video List
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/Feed'>See Notifications</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='disabled' disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        {currentUser != null && (
          <Card
            style={{
              backgroundColor: 'rgb(200, 199, 199)',
              fontFamily: "'PT Sans Narrow', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 'bold',
              letterSpacing: '2px',
              marginBottom: '100px',
            }}
          >
            <Card.Body>
              <h2 className='text-center mb-4' style={{ fontWeight: 'bold' }}>
                Profile
              </h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <div className='text-center mb-4'>
                <strong>Email:</strong> {currentUser.email}
              </div>
              <div className='w-100 text-center mt-2'>
                <Button
                  style={{
                    color: 'white',
                    letterSpacing: '2px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    border: 'solid',
                  }}
                  variant='link'
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
        <SearchBar />

        <SignUp />

        <End />
      </div>
    </body>
  );
}

export default HomePage;
