import { usePost } from '../contexts/PostContext';
import { useAsyncFn } from '../hooks/useAsync';
import { createComment } from '../services/comments';
import { CommentForm } from './CommentForm';
import React, { useEffect, useState, useRef } from 'react';
import { CommentList } from './CommentList';
import Nav from 'react-bootstrap/Nav';
import { db, storage } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './styles.css';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  addDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import CodeMirror from '@uiw/react-codemirror';
import { useAuth } from '../contexts/AuthContext';
//import { Controlled as CodeMirror } from 'react-codemirror2';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { ReactNotifications } from 'react-notifications-component';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

export function Post() {
  const { currentUser, logout } = useAuth();
  const [notce, setNotice] = useState();
  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState();
  const { post, rootComments, createLocalComment } = usePost();
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  //upload notification record to databas
  function uploadNotice() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dd = addDoc(collection(db, 'Notice'), {
      Notice: 'you get a reply',
      Date: today.toDateString(),
    });
  }
  //get notification and pop up
  function notifacation() {
    Store.addNotification({
      title: 'you get a reply, refesh to check it',
      message: 'teodosii@react-notifications-component',
      type: 'success',
      insert: 'top',
      container: 'top-left',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  }
  //display created comment
  function onCommentCreate(message) {
    setNotice('');
    setCount(count + 1);

    axios.get('http://localhost:3004/api/notice').then((response) => {
      console.log('this is data' + response.data);
      //setCode('xxxxxx' + response.data);
      setNotice(response.data);
    });

    return createCommentFn({ postId: post.id, message }).then(
      createLocalComment
    );
  }

  console.log(rootComments);
  console.log(currentUser.email);
  const [code, setCode] = useState([]);
  console.log('code' + code[1]);
  useEffect(() => {
    setNotice('');
    const interval = setInterval(() => {
      setTime(Date.now());
      axios.get('http://localhost:3004/api/notice').then((response) => {
        console.log('this is data' + response.data);
        //setCode('xxxxxx' + response.data);
        setNotice(response.data);
        if (response.data == currentUser.email) {
          setNotice('woaina');
          notifacation();
          uploadNotice();
        }
      });
    }, 5000);

    axios.post('http://localhost:3004/api/user', {
      u: currentUser.email,
      id: post.id,
      views: post.view,
    });
    /*axios.get('http://localhost:3004/api/notice').then((response) => {
      console.log('this is data' + response.data);
      //setCode('xxxxxx' + response.data);
      setNotice(response.data);
    });*/
    axios.get('http://localhost:3002/api/cardget').then((response) => {
      console.log('this is data' + response.data[3]);
      setCode(response.data);
    });
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <ReactNotifications />
      <h1>{notce}</h1>
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
            marginTop: '30px',
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '40px',
          }}
        >
          <article>{code[4]}</article>
        </div>
        <CodeMirror
          value={code[1]}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
        />
        <div
          style={{
            marginTop: '30px',
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: '1.5rem',
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
          Probelm Description
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
          <article>{code[2]}</article>
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

        <h3 className='comment-title'>Response</h3>
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
