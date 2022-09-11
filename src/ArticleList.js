import faker from 'faker';
import Card from './Card';
import './Card.css';
function ArticleList() {
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
}
export default ArticleList;
