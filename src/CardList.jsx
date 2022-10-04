import React from 'react';
import Card from './CardTest';
import faker from 'faker';
//import ArticleList from './ArticleList';
import './Card.css';

const CardList = (props) => {
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
  const filterArticle = ArticleList.filter((x) => {
    return x.name.toLowerCase().includes(props.searchArticle.toLowerCase());
  });
  const A = filterArticle.map((x) => (
    <div style={{ justifyContent: 'center', display: 'flex', flex: '33.3%' }}>
      <Card
        image={x.image}
        name={x.name}
        description={x.description}
        star={x.star}
        name1={x.name1}
      />
    </div>
  ));
  return <div style={{ display: 'flex' }}>{A}</div>;
};
export default CardList;
