import React from 'react';
import Card from './Card';
import faker from 'faker';

import './Card.css';

function CardList1() {
  const TutorialList = [
    {
      image: faker.image.people(),
      name: faker.name.firstName(),
      description: 'JS6',
      star: '5',
      name1: faker.name.lastName(),
    },
    {
      image: faker.image.people(),
      name: faker.name.firstName(),
      description: 'React Router',
      star: '5',
      name1: faker.name.lastName(),
    },
    {
      image: faker.image.people(),
      name: faker.name.firstName(),
      description: 'Express',
      star: '4.9',
      name1: faker.name.lastName(),
    },
  ];
  const A = TutorialList.map((x) => (
    <Card
      image={x.image}
      name={x.name}
      description={x.description}
      star={x.star}
      name1={x.name1}
    />
  ));

  return <div className='row'>{A}</div>;
}
export default CardList1;
