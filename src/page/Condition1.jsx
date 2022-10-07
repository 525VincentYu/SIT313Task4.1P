import React, { useState } from 'react';
import './PostPage.css';
import { db, storage } from '../firebase';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
//import { Controlled as CodeMirror } from 'react-codemirror2';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from 'firebase/storage';
import { v4 } from 'uuid';

import { Button, Form, Input } from 'semantic-ui-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

//post condition 1

function Condition1() {
  const [form, setForm] = useState({});
  const [cod, setCode] = useState();

  const date = new Date();
  let navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const handleChange1 = (value) => {
    setErrors('');
    setCode(value);
    setForm({ ...form, Code: cod });

    console.log(form.Code);
  };

  const handleChange = (e) => {
    setErrors('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //validate if is empty

  const validate = () => {
    let errors = {};
    if (!form.Title) {
      errors.Title = 'Title is Required';
    }
    if (!form.Description) {
      errors.Description = 'Problem is Required';
    }

    if (!form.Tags) {
      errors.Tags = 'Tags is Required';
    }
    return errors;
  };

  //handle the form
  const handleSubmit = async (e) => {
    console.log(form.Description);
    e.preventDefault();

    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    //setIsSubmit(true);

    await addDoc(collection(db, 'questions'), {
      ...form,
      Date: date.toLocaleDateString(),
    });
    //setForm(null);
    navigate('../');
    alert('Post uploaded!');
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        style={{
          height: 'auto',
          background: 'white',
          display: 'block',
          boxshadow: 'blue',
        }}
      >
        <div className='titles'>
          Title
          <input
            type='text'
            onChange={handleChange}
            className='iiput'
            name='Title'
            value={form.Title}
            placeholder='Start your question with how, what, why, etc.'
          />
        </div>
        {errors.Title && (
          <Alert style={{ marginTop: '10px' }} variant='danger'>
            {errors.Title}
          </Alert>
        )}
        <div className='titles'>Describe your problem</div>
        {errors.Description && (
          <Alert style={{ marginTop: '10px' }} variant='danger'>
            {errors.Description}
          </Alert>
        )}
        <textarea
          onChange={handleChange}
          className='problem'
          name='Description'
          value={form.Description}
          type='text'
        />
        <div className='titles'>Wirte your Code</div>
        <CodeMirror
          name='Description'
          placeholder={'Input Your Code Here'}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={handleChange1}
        />

        <div className='titles'>
          Tags
          <input
            onChange={handleChange}
            className='iiput'
            name='Tags'
            value={form.Tags}
            type='text'
            placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
          />
        </div>
        {errors.Tags && (
          <Alert style={{ marginTop: '10px' }} variant='danger'>
            {errors.Tags}
          </Alert>
        )}
        <Button primary type='submit' className='pls'>
          Post
        </Button>
      </Form>
    </div>
  );
}
export default Condition1;
