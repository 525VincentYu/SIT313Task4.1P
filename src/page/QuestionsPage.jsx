import React, { useEffect, useState, useRef } from 'react';
import './Test.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { AiOutlineSearch } from 'react-icons/ai';
import CloseButton from 'react-bootstrap/CloseButton';
import { Icon, Input } from 'semantic-ui-react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
//import { Container, Grid, Image } from 'semantic-ui-react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { list, StringFormat } from 'firebase/storage';

const Questions = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function removeList(id) {
    const newList = posts.filter((l) => l.id !== id);
    console.log('newList' + newList);
    setPosts(newList);
  }

  function handleOnDragEnd(result) {
    //if (!result.destination) return;

    const items = Array.from(posts);
    console.log('this i s items ' + items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPosts(items);
    console.log('this is new Post' + posts);
  }

  useEffect(() => {
    setOption(0);
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, 'questions'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPosts(list);
        console.log('this is  posts', posts);
        //const items = Array.from(posts);
        //console.log('this i s items ' + items);
        console.log('this is list', list[0].id);
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
    <div>
      <div style={{ marginBottom: '40px' }} className='image'>
        <img className='image' src={require('../image1.png')} />
      </div>
      <div
        style={{
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          <button className='ai'>
            <AiOutlineSearch size={22} />
          </button>
          <input
            style={{ marginRight: '50px' }}
            type='text'
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search...'
          ></input>
        </div>
        <div>
          <ToggleButtonGroup type='checkbox'>
            <ToggleButton id='tbg-btn-1' onClick={() => setOption(1)}>
              Date
            </ToggleButton>
            <ToggleButton id='tbg-btn-2' onClick={() => setOption(2)}>
              Tag
            </ToggleButton>
            <ToggleButton id='tbg-btn-3' onClick={() => setOption(3)}>
              Title
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='posts'>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                <Row
                  style={{ paddingLeft: '100px' }}
                  xs={1}
                  md={3}
                  className='g-4'
                >
                  {option == 0 &&
                    posts.map((item, index) => (
                      <Draggable
                        key={item.Title}
                        draggableId={item.Tags}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>
                              <Col>
                                <Card
                                  style={{
                                    height: 'auto',
                                    width: '18rem',
                                    marginRight: '200px',
                                  }}
                                >
                                  <Card.Body>
                                    <Card.Title value={searchTerm}>
                                      {item.Title}
                                    </Card.Title>
                                    <Card.Text>{item.Description}</Card.Text>
                                  </Card.Body>
                                  <ListGroup className='list-group-flush'>
                                    <ListGroup.Item value={searchTerm}>
                                      {item.Date}
                                    </ListGroup.Item>
                                    <ListGroup.Item value={searchTerm}>
                                      {item.Tags}
                                    </ListGroup.Item>
                                  </ListGroup>
                                  <Card.Body>
                                    <Card.Link href='#'>Card Link</Card.Link>
                                    <Card.Link href='#'>Another Link</Card.Link>
                                  </Card.Body>
                                  <Accordion>
                                    <Accordion.Item eventKey='0'>
                                      <Accordion.Header>
                                        See more details ...
                                      </Accordion.Header>

                                      <Accordion.Body>
                                        This is made by Manjiang Yu !
                                      </Accordion.Body>
                                      <Accordion.Body
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'end',
                                        }}
                                      >
                                        <Button
                                          onClick={() => removeList(item.id)}
                                          variant='danger'
                                        >
                                          Delete
                                        </Button>{' '}
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </Card>
                              </Col>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}

                  {option == 1 &&
                    posts
                      .filter((item) => item.Date.toLowerCase().includes(query))
                      .map((item) => (
                        <Col>
                          <Card
                            style={{
                              height: 'auto',
                              width: '18rem',
                              marginRight: '200px',
                            }}
                          >
                            <Card.Body>
                              <Card.Title value={searchTerm}>
                                {item.Title}
                              </Card.Title>
                              <Card.Text>{item.Description}</Card.Text>
                            </Card.Body>
                            <ListGroup className='list-group-flush'>
                              <ListGroup.Item value={searchTerm}>
                                {item.Date}
                              </ListGroup.Item>
                              <ListGroup.Item value={searchTerm}>
                                {item.Tags}
                              </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link href='#'>Card Link</Card.Link>
                              <Card.Link href='#'>Another Link</Card.Link>
                            </Card.Body>
                            <Accordion>
                              <Accordion.Item eventKey='0'>
                                <Accordion.Header>
                                  See more details ...
                                </Accordion.Header>

                                <Accordion.Body>
                                  This is made by Manjiang Yu !
                                </Accordion.Body>
                                <Accordion.Body
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                  }}
                                >
                                  <Button
                                    onClick={() => removeList(item.id)}
                                    variant='danger'
                                  >
                                    Delete
                                  </Button>{' '}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </Card>
                        </Col>
                      ))}
                  {option == 2 &&
                    posts
                      .filter((item) => item.Tags.includes(query))
                      .map((item) => (
                        <Col>
                          <Card
                            style={{
                              height: 'auto',
                              width: '18rem',
                              marginRight: '200px',
                            }}
                          >
                            <Card.Body>
                              <Card.Title value={searchTerm}>
                                {item.Title}
                              </Card.Title>
                              <Card.Text>{item.Description}</Card.Text>
                            </Card.Body>
                            <ListGroup className='list-group-flush'>
                              <ListGroup.Item value={searchTerm}>
                                {item.Date}
                              </ListGroup.Item>
                              <ListGroup.Item value={searchTerm}>
                                {item.Tags}
                              </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link href='#'>Card Link</Card.Link>
                              <Card.Link href='#'>Another Link</Card.Link>
                            </Card.Body>
                            <Accordion>
                              <Accordion.Item eventKey='0'>
                                <Accordion.Header>
                                  See more details ...
                                </Accordion.Header>

                                <Accordion.Body>
                                  This is made by Manjiang Yu !
                                </Accordion.Body>
                                <Accordion.Body
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                  }}
                                >
                                  <Button
                                    onClick={() => removeList(item.id)}
                                    variant='danger'
                                  >
                                    Delete
                                  </Button>{' '}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </Card>
                        </Col>
                      ))}
                  {option == 3 &&
                    posts
                      .filter((item) => item.Title.includes(query))
                      .map((item) => (
                        <Col>
                          <Card
                            style={{
                              height: 'auto',
                              width: '18rem',
                              marginRight: '200px',
                            }}
                          >
                            <Card.Body>
                              <Card.Title value={searchTerm}>
                                {item.Title}
                              </Card.Title>
                              <Card.Text>{item.Description}</Card.Text>
                            </Card.Body>
                            <ListGroup className='list-group-flush'>
                              <ListGroup.Item value={searchTerm}>
                                {item.Date}
                              </ListGroup.Item>
                              <ListGroup.Item value={searchTerm}>
                                {item.Tags}
                              </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link href='#'>Card Link</Card.Link>
                              <Card.Link href='#'>Another Link</Card.Link>
                            </Card.Body>
                            <Accordion>
                              <Accordion.Item eventKey='0'>
                                <Accordion.Header>
                                  See more details ...
                                </Accordion.Header>

                                <Accordion.Body>
                                  This is made by Manjiang Yu !
                                </Accordion.Body>
                                <Accordion.Body
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                  }}
                                >
                                  <Button
                                    onClick={() => removeList(item.id)}
                                    variant='danger'
                                  >
                                    Delete
                                  </Button>{' '}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </Card>
                        </Col>
                      ))}
                </Row>
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
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
export default Questions;
