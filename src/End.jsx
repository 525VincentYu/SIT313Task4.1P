import React from 'react';
import './End.css';
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from 'react-icons/ai';

function End() {
  return (
    <div>
      <div className='endform'>
        <div className='endformitem'>
          <h1 className='ww'>Explore</h1>
          <h2 className='ww'>Home</h2>
          <h2 className='ww'>Questions</h2>
          <h2 className='ww'>Articles</h2>
          <h2 className='ww'>Tutorials</h2>
        </div>
        <div className='endformitem'>
          <h1 className='ww'>Support</h1>
          <h2 className='ww'>FAQs</h2>
          <h2 className='ww'>Help</h2>
          <h2 className='ww'>Contact Us</h2>
        </div>
        <div className='endformitem'>
          <h1 className='ww'>Stay connected</h1>
          <div className='icon'>
            <div className='ss'>
              <AiFillFacebook size={40} />
            </div>
            <div className='ss'>
              <AiFillTwitterSquare size={40} />
            </div>
            <div className='ss'>
              <AiFillInstagram size={40} />
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
