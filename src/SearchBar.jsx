import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar() {
  return (
    <div className='form'>
      <div className='formitem'>DEV@Deakin</div>
      <div className='form1'>
        <button className='ai'>
          <AiOutlineSearch size={22} />
        </button>
        <input className='search' type='text' placeholder='Search...'></input>
      </div>
      <button className='pl'>Post</button>
      <button className='pl'>Login</button>
    </div>
  );
}
export default SearchBar;
