import React from 'react';
import './End.css';
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function End() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='endform'>
        <div className='endformitem'>
          <div onClick={() => navigate('/ss')} className='ww'>
            Explore
          </div>
          <h2 onClick={() => navigate('/')} className='ww'>
            Home
          </h2>
          <h2 onClick={() => navigate('/ss')} className='ww'>
            Questions
          </h2>
          <h2 onClick={() => navigate('/tt')} className='ww'>
            Articles
          </h2>
          <h2 onClick={() => navigate('/')} className='ww'>
            Tutorials
          </h2>
        </div>
        <div className='endformitem'>
          <h1
            onClick={() =>
              navigate((window.location.href = 'https://www.deakin.edu.au/'))
            }
            className='ww'
          >
            Support
          </h1>
          <h2 className='ww'>FAQs</h2>
          <h2
            onClick={() =>
              navigate((window.location.href = 'https://github.com/'))
            }
            className='ww'
          >
            Help
          </h2>
          <h2
            onClick={() =>
              navigate((window.location.href = 'https://www.deakin.edu.au/'))
            }
            className='ww'
          >
            Contact Us
          </h2>
        </div>
        <div className='endformitem'>
          <h1 className='ww'>Stay connected</h1>
          <div className='icon'>
            <div
              onClick={() =>
                navigate((window.location.href = 'https://www.deakin.edu.au/'))
              }
              className='ss'
            >
              <AiFillFacebook
                onClick={() =>
                  navigate(
                    (window.location.href =
                      'https://www.facebook.com/DeakinUniversity/')
                  )
                }
                size={40}
              />
            </div>
            <div className='ss'>
              <AiFillTwitterSquare
                onClick={() =>
                  navigate(
                    (window.location.href =
                      'https://twitter.com/Deakin?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor')
                  )
                }
                size={40}
              />
            </div>
            <div className='ss'>
              <AiFillInstagram
                onClick={() =>
                  navigate(
                    (window.location.href =
                      'https://www.instagram.com/deakinuniversity/?hl=en')
                  )
                }
                size={40}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='endform2'>
        <h1 className='Deakin'>DEV@Deakin 2022</h1>
        <div className='endform'>
          <h2 className='endformitem'>Privacy Policy</h2>
          <h2 className='endformitem'>Terms</h2>
          <h2 className='endformitem'>Code of Concuct</h2>
        </div>
      </div>
    </div>
  );
}
export default End;
