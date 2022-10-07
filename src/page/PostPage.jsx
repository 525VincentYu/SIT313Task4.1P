import React, { useState } from 'react';
import './PostPage.css';
import Condition1 from './Condition1';
import Condition2 from './Condition2';

function PostPage() {
  //set condition
  const [post, setPost] = useState();

  return (
    <body>
      <div className='forms'>
        <div className='formitems'>New Post </div>
      </div>
      <div className='select'>
        Select Post Type:
        <div className='but'>
          <input
            type='radio'
            name='Post Type'
            value='Questions'
            onClick={() => setPost(true)}
          />
          Questions
        </div>
        <div>
          <input
            type='radio'
            name='Post Type'
            value='Articles'
            onClick={() => setPost(false)}
          />
          Articles
        </div>
      </div>
      <div className='forms'>
        <div className='formitems'>What do you want to ask or share </div>
      </div>

      {post === true && <Condition1 />}
      {post === false && <Condition2 />}
    </body>
  );
}
export default PostPage;
