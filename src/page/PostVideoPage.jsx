import React, { useState, useEffect } from 'react';
import './PostPage.css';
import { db, storage } from '../firebase';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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

//import { response } from 'express';
function PostVideoPage() {
  let navigate = useNavigate();
  const date = new Date();
  const [form, setForm] = useState([]);
  //const [Title, Abstract, Article, Tags] = form;

  const [imageUpload, setImageUpload] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, 'videos/');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setErrors('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //validate if it empty
  const validate = () => {
    let errors = {};
    if (!form.Title) {
      errors.Title = 'Title is Required';
    }
    if (!form.Abstract) {
      errors.Abstract = 'Abstract is Required';
    }
    if (!form.Article) {
      errors.Article = 'Article is Required';
    }
    if (!form.Tags) {
      errors.Tags = 'Tags is Required';
    }
    return errors;
  };
  //upload Video
  const uploadImage = () => {
    if (imageUpload == null) return;
    setLoading(true);

    const imageRef = ref(storage, `videos/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      setLoading(false);
      alert('Video uploaded!');

      getDownloadURL(snapshot.ref).then((url) => {
        setForm((prev) => ({ ...prev, img: url }));
      });
    });
  };

  /*useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setForm((prev) => [...prev, url]);
        });
      });
    });
  }, []);*/

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);

    await addDoc(collection(db, 'postvideo'), {
      ...form,
      Date: date.toLocaleDateString(),
    });
    //setForm(null);
    navigate('../');
    alert('Post uploaded!');
  };

  return (
    <div style={{ display: 'flex}' }}>
      <div
        style={{ dispaly: 'flex', justifuContent: 'center', padding: '110px' }}
      >
        <h1>Upload Your Video!</h1>
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
              style={{ fontWeight: 'bold' }}
              error={errors.Title ? { content: errors.Title } : null}
              type='text'
              onChange={handleChange}
              className='iiput'
              name='Title'
              value={form.Title}
              placeholder='Enter a descriptive title'
            />
          </div>
          {errors.Title && (
            <Alert style={{ marginTop: '10px' }} variant='danger'>
              {errors.Title}
            </Alert>
          )}

          <div className='titles'>
            Add an Video
            <input
              type='file'
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              className='iiput2'
            />
            <button
              disabled={loading}
              style={{
                border: 'none',
                height: '40px',
                width: '90px',
                fontFamily: "'PT Sans Narrow', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
              onClick={uploadImage}
            >
              Upload
            </button>
          </div>
          <div className='titles'>Abstract</div>
          <textarea
            onChange={handleChange}
            className='abstract'
            name='Abstract'
            value={form.Abstract}
            placeholder='Enter a 1-paragraph abstract'
            type='text'
          />
          {errors.Abstract && (
            <Alert style={{ marginTop: '10px' }} variant='danger'>
              {errors.Abstract}
            </Alert>
          )}
          <div className='titles'>Article Text</div>
          <textarea
            onChange={handleChange}
            className='article'
            name='Article'
            value={form.Article}
            placeholder='Enter a 1-paragraph abstract'
            type='text'
          />
          {errors.Article && (
            <Alert style={{ marginTop: '10px' }} variant='danger'>
              {errors.Article}
            </Alert>
          )}

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
    </div>
  );
}
export default PostVideoPage;
