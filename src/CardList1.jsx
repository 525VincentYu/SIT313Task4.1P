import React from 'react';
import Card from './Card';
import faker from 'faker';
import ArticleList from './ArticleList';
import './Card.css';

const CardList1 = () => {
  return (
    <div className='row'>
      <Card
        image={ArticleList[3].image}
        name={ArticleList[3].name}
        description={ArticleList[3].description}
        star={ArticleList[3].star}
        name1={ArticleList[3].name1}
      />
      <Card
        image={ArticleList[4].image}
        name={ArticleList[4].name}
        description={ArticleList[4].description}
        star={ArticleList[4].star}
        name1={ArticleList[4].name1}
      />
      <Card
        image={ArticleList[5].image}
        name={ArticleList[5].name}
        description={ArticleList[5].description}
        star={ArticleList[5].star}
        name1={ArticleList[5].name1}
      />
    </div>
  );
};
export default CardList1;
