import React from 'react';
import './Card.css';
import { AiFillStar } from 'react-icons/ai';

const Card = (props) => {
  return (
    <div className='column'>
      <img className='fa' src={props.image} alt='' />
      <h3>{props.name}</h3>
      <h4>{props.description}</h4>

      <div className='row'>
        <AiFillStar size={22} color={'orange'} className='star' />
        <p>{props.star}</p>
        <h4 className='name'>{props.name1}</h4>
      </div>
    </div>
  );
};
export default Card;
