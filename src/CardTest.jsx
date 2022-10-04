import React from 'react';
import './Card.css';
import { AiFillStar } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';

const CardTest = (props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>
          <div className='row1'>
            <AiFillStar size={22} color={'orange'} className='star' />
            <p>{props.star}</p>
            <p className='name'>{props.name1}</p>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default CardTest;
