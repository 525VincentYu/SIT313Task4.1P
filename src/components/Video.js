import { usePost } from '../contexts/PostContext';
import { useAsyncFn } from '../hooks/useAsync';
import { createComment } from '../services/comments';
import { CommentForm } from './CommentForm';

import ReactStars from 'react-rating-stars-component';
import { render } from 'react-dom';

import React, { useEffect, useState, useRef } from 'react';
import { CommentList } from './CommentList';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CodeMirror from '@uiw/react-codemirror';
import { useAuth } from '../contexts/AuthContext';
//import { Controlled as CodeMirror } from 'react-codemirror2';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import ReactPlayer from 'react-player';
import { Rating } from 'semantic-ui-react';

export function Video() {
  const { currentUser, logout } = useAuth();
  const { post, rootComments, createLocalComment } = usePost();
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);
  console.log(post);

  function onCommentCreate(message) {
    axios.post('http://localhost:3004/api/user', {
      u: currentUser.email,
      id: post.id,
      views: post.view,
    });
    return createCommentFn({ postId: post.id, message }).then(
      createLocalComment
    );
  }
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  console.log(rootComments);
  const [code, setCode] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:3004/api/user', {
      u: currentUser.email,
      id: post.id,
      views: post.view + 1,
    });

    //get the vidoe
    axios.get('http://localhost:3002/api/videoget').then((response) => {
      console.log('this is data' + response.data[2]);
      setCode(response.data);
    });
  }, []);

  return (
    <>
      <Nav
        style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
        variant='pills'
        defaultActiveKey='/home'
      >
        <Nav.Item>
          <Nav.Link href='/'>Back</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-1'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='disabled' disabled>
            Post
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div
        style={{
          border: '3px',
          borderWidth: '10px',
          borderRadius: '30px',
          padding: '20px',

          borderColor: 'rgb(78, 138, 206)',
          borderStyle: 'groove',
        }}
      >
        <div
          style={{
            padding: '10px',
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: '1.5rem',
          }}
        >
          <article>{code[4]}</article>
        </div>
        <div style={{ display: 'flex', justifiContent: 'center' }}>
          <div>
            <ReactPlayer
              url={code[5]}
              playing={true}
              controls={true}
              loop={true}
              muted={true}
              playsinline={true}
              onReady={true}
            />
          </div>
        </div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor='#ffd700'
        />
        <article>
          {post.view} views {code[2]}
        </article>

        <h2
          style={{
            marginTop: '30px',
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontWeight: 'bold',
          }}
        >
          Video Description
        </h2>
        <div
          style={{
            border: '3px',
            borderWidth: '5px',
            borderRadius: '30px',
            padding: '10px',
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: '1.5rem',

            borderColor: 'rgb(78, 138, 206)',
            borderStyle: 'groove',
          }}
        >
          <article>{code[0]}</article>
        </div>
        <h2
          style={{
            marginTop: '30px',
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontWeight: 'bold',
          }}
        >
          Tags
        </h2>
        <div
          style={{
            padding: '10px',
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: '1.5rem',
          }}
        >
          <article>{code[3]}</article>
        </div>
        <div
          style={{
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          Response
        </div>
        <section>
          <CommentForm
            loading={loading}
            error={error}
            onSubmit={onCommentCreate}
          />
          {rootComments != null && rootComments.length > 0 && (
            <div className='mt-4'>
              <CommentList comments={rootComments} />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
