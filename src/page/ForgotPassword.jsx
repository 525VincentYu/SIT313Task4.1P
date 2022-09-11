import React, { useRef } from 'react';
import './Test.css';
import './LoginPage.css';
import '../image1.png';
import { Link, useNavigate } from 'react-router-dom';

import { useContext, useState, useEffect } from 'react';

import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import { auth, createUserDocument } from '../firebase';

export default function ForgotPassword() {
  let navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();

  const { currentUser } = useAuth();
  const { resetPassword } = useAuth();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setMessage('');
      setLoading(true);

      await resetPassword(emailRef.current.value);
      setMessage('Check ypur inbox for futher instructions');

      //console.log(currentUser.email);
    } catch {
      setError('Failed to reset');
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
            <h2 className='CR'>Password Rest</h2>

            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}

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
              >
                <Button
                  disabled={loading}
                  style={{ width: '400px' }}
                  className='mt-4 '
                  type='submit'
                >
                  Reset Password
                </Button>
              </Form.Group>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to='/Test2'>Login</Link>
            </div>
          </Card.Body>
        </Card>

        <div className='w-100 text-center mt-2'>
          Need an account? Click <Link to='../Test'>Sign Up!</Link>
        </div>
      </div>
    </>
  );
}
