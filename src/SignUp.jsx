import React from 'react';
import { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
function SignUp() {
  const [email, setEmail] = useState('');
  const submit = () => {
    axios
      .post('http://localhost:3002/api/insert', {
        email: email,
      })
      .then(() => {
        alert('Successfully sign Up !');
      });
  };
  return (
    <div style={{ width: '970px' }} className='form'>
      <div class='formitem'>SIGN UP FOR OUR DAILY INSIDER</div>
      <div class='formitem'>
        <input
          type='text'
          name='email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          class='forminput'
          placeholder='Enter your Email'
          aria-label='Enter your Email'
        />
      </div>
      <button
        class='form-button'
        onClick={submit}
        name='subscripe'
        type='submit'
      >
        Subscripe
      </button>
    </div>
  );
}

export default SignUp;
