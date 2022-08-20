import React from 'react';
import Card from './Card';
import faker from 'faker';
//import ArticleList from './ArticleList';
import './Card.css';

function CardList() {
  const ArticleList = [
    {
      image: require('./ArticleImage.png'),
      name: 'how computer science serves the world',
      description: 'React',
      star: '5',
      name1: faker.name.lastName(),
    },
    {
      image: require('./ArticleImage1.png'),
      name: 'Robots make computer science personal',
      description: 'Node.JS',
      star: '5',
      name1: faker.name.lastName(),
    },
    {
      image: require('./ArticleImage2.png'),
      name: 'Caring, Comedy, Creativity, and Challenging',
      description: 'React Hooks',
      star: '5',
      name1: faker.name.lastName(),
    },
  ];
  const A = ArticleList.map((x) => (
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
export default CardList;
