import React from 'react';
import './SignUp.css';
function SignUp() {
  return (
    <form action='/' class='form' method='post'>
      <div className='form'>
        <div class='formitem'>SIGN UP FOR OUR DAILY INSIDER</div>
        <div class='formitem'>
          <input
            type='text'
            name='email'
            class='forminput'
            placeholder='Enter your Email'
            aria-label='Enter your Email'
          />
        </div>
        <button class='form-button' name='subscripe' type='submit'>
          Subscripe
        </button>
      </div>
    </form>
  );
}

export default SignUp;
