import React, { useRef } from 'react';
import './Test.css';
import './LoginPage.css';
import '../image1.png';
import { Link, useNavigate } from 'react-router-dom';

import { useContext, useState, useEffect } from 'react';

import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import { auth, createUserDocument } from '../firebase';

export default function Test2() {
  let navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { currentUser, login } = useAuth();

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');

      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);
      navigate('../Dashboard', { replace: true });

      console.log(currentUser.email);
    } catch {
      setError('Failed to Sign in');
    }
    setLoading(false);
  }
  return (
    <>
      <div
        className='w-100  align-center '
        style={{ maxWidth: '800px', maxHeight: '1000px' }}
      >
        <div className='image'>
          <img className='image' src={require('../image1.png')} />
        </div>

        <Card
          style={{
            borderColor: 'rgb(78, 138, 206)',
            borderWidth: '2px',
            width: '600px',
            height: '400px',
            marginTop: '50px',
          }}
        >
          <Card.Body>
            <button
              style={{
                backgroundColor: 'white',
                display: 'flex',

                borderWidth: '3px',
                border: 'solid',
                marginLeft: '80%',
                color: 'rgb(78, 138, 206)',
                fontFamily: "'PT Sans Narrow', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 'bold',

                borderColor: 'rgb(78, 138, 206)',
              }}
              onClick={() => navigate('/SignUp')}
            >
              Sign Up
            </button>

            {error && <Alert variant='danger'>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group
                style={{ display: 'flex', justifyContent: 'center' }}
                className='d-flex mt-4'
                id='email'
              >
                <div>
                  <Form.Label style={{ fontWeight: 'bold' }} className='NA'>
                    Your email*
                  </Form.Label>
                  <Form.Control
                    style={{ width: '400px' }}
                    type='email'
                    ref={emailRef}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group
                style={{ display: 'flex', justifyContent: 'center' }}
                className='d-flex mt-4'
                id='password'
              >
                <div>
                  <Form.Label style={{ fontWeight: 'bold' }} className='NA'>
                    Your Password*
                  </Form.Label>
                  <Form.Control
                    style={{ width: '400px' }}
                    type='password'
                    ref={passwordRef}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group
                style={{ display: 'flex', justifyContent: 'center' }}
                className='d-flex mt-4'
              >
                <Button
                  disabled={loading}
                  style={{ width: '400px' }}
                  className='mt-4 '
                  type='submit'
                >
                  Log in
                </Button>
              </Form.Group>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>

        <div className='w-100 text-center mt-2'>
          Need an account? Click <Link to='../SignUp'>Sign Up!</Link>
        </div>
      </div>
    </>
  );
}
