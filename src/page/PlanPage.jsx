import React, { useRef } from 'react';
import './Test.css';
import './LoginPage.css';
import '../image1.png';
import bcrypt from 'bcryptjs';
import faker from 'faker';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useContext, useState, useEffect } from 'react';

import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { auth, createUserDocument } from '../firebase';

export default function Plan() {
  const MySwal = withReactContent(Swal);
  const publishableKey =
    'pk_test_51L0nNjKuatJVCh6U3QdhGIXJ7AiLvVWrzyfvqFewOiQkfV31lHDRZtgTfqRUDVIGTu2xUNjxNxeS2YMVCeqSVgZd00YDYdGyIe';
  const [product, setProduct] = useState({
    name: '',
    price: 0,
  });
  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: 'http://localhost:3001/payment',
        method: 'post',
        data: {
          amount: 30 * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };
  return (
    <>
      <body>
        <Nav
          style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
          variant='pills'
          defaultActiveKey='/home'
        >
          <Nav.Item>
            <Nav.Link href='/'>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='link-1'>Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='disabled' disabled>
              Sign Up
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div
          style={{
            width: '100%',
            height: '300px',
            background: 'rgb(194, 234, 233)',
            marginTop: '30px',
            fontWeight: 'bold',
            letterSpacing: '3px',
            wordSpacing: '5px',
            fontFamily: "'PT Sans Narrow', sans-serif",
          }}
        >
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            Explore Your Right Rlan For DEV@DEAKIN APP
          </h1>
          <div style={{ marginTop: '50px' }}>
            <h3
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              Choose A Plan That Suits You Best !
            </h3>
          </div>
        </div>
        <div
          style={{
            padding: '10px',
            paddingLeft: '80px',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ marginRight: '50px' }}>
            <Card
              className='card1'
              style={{
                width: '400px',
                height: '400px',
                flex: '33.3%',
              }}
            >
              <Card.Header
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '2rem',

                  background: 'rgb(194, 234, 233)',
                }}
              >
                Basic
              </Card.Header>
              <Card.Body
                className='card-content'
                style={{ color: 'white', padding: '2em' }}
              >
                <Card.Title
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}
                >
                  Free
                </Card.Title>

                <Card.Text
                  style={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    justifyContent: 'center',
                    fontFamily: "'PT Sans Narrow', sans-serif",

                    wordSpacing: '3px',
                  }}
                >
                  All Regular articles and tutorials
                </Card.Text>
                <Card.Text
                  style={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    justifyContent: 'center',
                    fontFamily: "'PT Sans Narrow', sans-serif",

                    wordSpacing: '3px',
                  }}
                >
                  10 Post Times Every week
                </Card.Text>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button style={{ width: '200px' }} variant='primary'>
                    Start For Free
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div style={{ marginRight: '50px' }}>
            <Card
              className='card2'
              style={{
                width: '400px',
                height: '400px',
                flex: '33.3%',
              }}
            >
              <Card.Header
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '2rem',

                  background: 'rgb(194, 234, 233)',
                }}
              >
                Standard
              </Card.Header>
              <Card.Body
                className='card-content'
                style={{ color: 'YellowGreen', padding: '2em' }}
              >
                <Card.Title
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}
                >
                  A$20.00/Month
                </Card.Title>

                <Card.Text
                  style={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    justifyContent: 'center',
                    fontFamily: "'PT Sans Narrow', sans-serif",

                    wordSpacing: '3px',
                  }}
                >
                  Premium tutorials and Articles
                </Card.Text>
                <Card.Text
                  style={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    justifyContent: 'center',
                    fontFamily: "'PT Sans Narrow', sans-serif",

                    wordSpacing: '3px',
                  }}
                >
                  No Post Times Limitation
                </Card.Text>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button style={{ width: '200px' }} variant='primary'>
                    Pay
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div style={{ marginRight: '50px' }}>
            <Card
              className='card3'
              style={{
                width: '400px',
                height: '400px',
                flex: '33.3%',
              }}
            >
              <Card.Header
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '2rem',

                  background: 'rgb(194, 234, 233)',
                }}
              >
                Premium
              </Card.Header>
              <Card.Body
                className='card-content'
                style={{ color: 'yellow', padding: '2em' }}
              >
                <Card.Title
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}
                >
                  A$30.00/Month
                </Card.Title>

                <Card.Text
                  style={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    justifyContent: 'center',
                    fontFamily: "'PT Sans Narrow', sans-serif",

                    wordSpacing: '3px',
                  }}
                >
                  All Standard +
                </Card.Text>
                <Card.Text
                  style={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    justifyContent: 'center',
                    fontFamily: "'PT Sans Narrow', sans-serif",

                    wordSpacing: '3px',
                  }}
                >
                  analytics dashboard.
                </Card.Text>
                <Card.Text
                  style={{
                    display: 'flex',
                    fontSize: '1.5rem',
                    justifyContent: 'center',
                    fontFamily: "'PT Sans Narrow', sans-serif",

                    wordSpacing: '3px',
                  }}
                >
                  Custom-made MessagesBannersThemes
                </Card.Text>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <StripeCheckout
                    stripeKey={publishableKey}
                    label='Pay Now'
                    name='Pay With Credit Card'
                    billingAddress
                    shippingAddress
                    amount={3000}
                    description={`Your total is $${30}`}
                    token={payNow}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </body>
    </>
  );
}
