import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import CardList from './CardList';
import CardList1 from './CardList1';
import './index.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  let navigate = useNavigate();

  return (
    <div className='pre'>
      <div className='form'>
        <div className='formitem'>DEV@Deakin</div>
        <div className='form1'>
          <button className='ai'>
            <AiOutlineSearch size={22} />
          </button>
          <input
            className='search'
            type='text'
            placeholder='Search...'
            onChange={onSearchChange}
            value={searchTerm}
          ></input>
        </div>
        <button className='pl' onClick={() => navigate('/Post')}>
          Post
        </button>
        <button className='pl' onClick={() => navigate('/Login')}>
          Login
        </button>
        <button className='pl' onClick={() => navigate('/ss')}>
          Question
        </button>
      </div>
      <div className='image'>
        <img className='image' src={require('./image1.png')} />
      </div>
      <p className='feature'>Featured Acticles</p>
      <CardList searchArticle={searchTerm} />
      <div className='feature'>
        <button className='pl' onClick={() => navigate('/ss')}>
          See all articles
        </button>
      </div>
      <p className='feature'>Featured Tutorials</p>
      <CardList1 searchArticle={searchTerm} />
      <div className='feature'>
        <button className='pl' onClick={() => navigate('/tt')}>
          See all articles
        </button>
      </div>
    </div>
  );
}
export default SearchBar;
