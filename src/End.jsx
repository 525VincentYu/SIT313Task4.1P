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
          <h1>Explore</h1>
          <h2>Home</h2>
          <h2>Questions</h2>
          <h2>Articles</h2>
          <h2>Tutorials</h2>
        </div>
        <div className='endformitem'>
          <h1>Support</h1>
          <h2>FAQs</h2>
          <h2>Help</h2>
          <h2>Contact Us</h2>
        </div>
        <div className='endformitem'>
          <h1>Stay connected</h1>
          <div className='icon'>
            <AiFillFacebook size={30} />
            <AiFillTwitterSquare size={30} />
            <AiFillInstagram size={30} />
          </div>
        </div>
      </div>
      <div className='endform2'>
        <h1 className='Deakin'>DEV@Deakin 2022</h1>
        <div className='endform3'>
          <h2 className='endformitem'>Privacy Policy</h2>
          <h2 className='endformitem'>Terms</h2>
          <h2 className='endformitem'>Code of Concuct</h2>
        </div>
      </div>
    </div>
  );
}
export default End;
