import React, { useRef } from 'react';
import './Test.css';
import './LoginPage.css';
import '../image1.png';
import bcrypt from 'bcryptjs';

import { useContext, useState, useEffect } from 'react';

import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { auth, createUserDocument } from '../firebase';

export default function Test() {
  let navigate = useNavigate();
  const nameRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signup } = useAuth();
  const [message, setMessage] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError('Passwords do not match');

    try {
      setError('');
      setLoading(true);

      const { user } = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      console.log(user);
      const password = passwordRef.current.value;
      const hashPassword = bcrypt.hashSync(password, 10);
      await createUserDocument(user, nameRef.current.value, hashPassword);
      setMessage('Successfully Sign Up!');
    } catch {
      setError('Failed to create an account');
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
            width: '800px',
            height: '500px',
            marginTop: '50px',
          }}
        >
          <Card.Body>
            <h2 className='CR'>Create a DEV@Deakin Account</h2>

            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className='d-flex mt-4' id='name'>
                <Form.Label className='NA'>Name*</Form.Label>
                <Form.Control type='name' ref={nameRef} required />
              </Form.Group>
              <Form.Group className='d-flex mt-4' id='email'>
                <Form.Label className='NA'>Email*</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group className='d-flex mt-4' id='password'>
                <Form.Label className='NA'>Password*</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>
              <Form.Group className='d-flex mt-4' id='password-confirm'>
                <Form.Label className='NA'>Confirm Password*</Form.Label>
                <Form.Control
                  type='password'
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>

              <Form.Group className='d-flex mt-4'>
                <div className='NA'></div>

                <Button
                  disabled={loading}
                  className='w-100 mt-4 '
                  type='submit'
                >
                  Sign Up
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Already have anaccount? <Link to='../Login'>Log In</Link>
        </div>
      </div>
    </>
  );
}
