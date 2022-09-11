import React, { useEffect, useState } from 'react';

import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { Container, Grid, Image } from 'semantic-ui-react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { StringFormat } from 'firebase/storage';

const Find = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, 'post'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPosts(list);
        console.log('this is post', posts);
        console.log('this is list', list[0].timestamp);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <div style={{ display: 'flex', padding: '10px' }}>
      {posts &&
        posts.map((item) => (
          <div style={{ display: 'flex', padding: '10px' }}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                src={item.img}
                size='medium'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '180px',

                  borderRedius: '50%',
                }}
              />
              <Card.Body>
                <Card.Title>{item.Title}</Card.Title>
                <Card.Text>{item.Abstract}</Card.Text>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroup.Item>{item.Article}</ListGroup.Item>
                <ListGroup.Item>{item.Tags}</ListGroup.Item>
                <ListGroup.Item>{item.Date}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href='#'>Card Link</Card.Link>
                <Card.Link href='#'>Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
    /*<Container>
      <Card.Group>
        <Grid columns={3} stackable>
          {posts &&
            posts.map((item) => (
              <Grid.Column>
                <Card.Content>
                  <Image
                    src={item.img}
                    size='medium'
                    style={{
                      height: '150px',
                      width: '150px',
                      borderRedius: '50%',
                    }}
                  />
                </Card.Content>
              </Grid.Column>
            ))}
        </Grid>
      </Card.Group>
    </Container>*/
  );
};
export default Find;
