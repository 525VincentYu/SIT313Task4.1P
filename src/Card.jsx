import React from 'react';
import './Card.css';
import { AiFillStar } from 'react-icons/ai';

const Card = (props) => {
  return (
    <div className='column'>
      <div className='image'>
        <img className='fa' src={props.image} alt='' />
      </div>
      <div className='word'>
        <p>{props.name}</p>
      </div>
      <div className='word'>
        <p>{props.description}</p>
      </div>

      <div className='row1'>
        <AiFillStar size={22} color={'orange'} className='star' />
        <p>{props.star}</p>
        <p className='name'>{props.name1}</p>
      </div>
    </div>
  );
};
export default Card;
