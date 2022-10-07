import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
    <>
      <div>
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

        <HomePage />
      </div>
    </>
  );
}
