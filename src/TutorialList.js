import faker from 'faker';

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
export default TutorialList;
