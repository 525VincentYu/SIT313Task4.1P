import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { Container, Grid, Image } from 'semantic-ui-react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { StringFormat } from 'firebase/storage';
import ReactPlayer from 'react-player';
import { useAsync } from '../hooks/useAsync';
import { getPosts } from '../services/posts';
import './styles.css';
import Nav from 'react-bootstrap/Nav';

export function VideoPostList() {
  const [postss, setPosts] = useState([]);
  const { loading, error, value: posts } = useAsync(getPosts);
  const [loadings, setLoading] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const onLoadedData = () => {
    setIsVideoLoaded(false);
  };
  function seeDetail(id) {
    const newList = postss.filter((l) => l.id == id);

    console.log(newList[0].id + 'id');
    axios.post('http://localhost:3002/api/video', {
      Abstract: newList[0].Abstract,
      Article: newList[0].Article,
      Date: newList[0].Date,
      Tags: newList[0].Tags,
      Title: newList[0].Title,
      img: newList[0].img,
    });
  }
  useEffect(() => {
    setLoading(true);
    //get the video List
    const unsub = onSnapshot(
      collection(db, 'postvideo'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPosts(list);
        //console.log('this is post', postss[0].Article);
        //console.log('this is list', list[0].timestamp);
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

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1 className='error-msg'>{error}</h1>;
  const comment = Array.from(posts);
  console.log('ccc' + comment[2].id);
  return (
    <div>
      <Nav
        style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
        variant='pills'
        defaultActiveKey='/home'
      >
        <Nav.Item>
          <Nav.Link href='/'>Back</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-1'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='disabled' disabled>
            Post
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div
        style={{
          border: '3px',
          borderWidth: '5px',
          borderRadius: '30px',
          paddingLeft: '39%',
          fontFamily: "'PT Sans Narrow', sans-serif",
          fontSize: '3rem',
          fontWeight: 'bold',

          borderColor: 'rgb(78, 138, 206)',
          borderStyle: 'groove',
        }}
      >
        Video List
      </div>
      <div style={{ display: 'flex', padding: '10px' }}>
        {postss &&
          postss.map((item, index) => (
            <div style={{ display: 'flex', padding: '10px' }}>
              <div></div>
              <Card style={{ width: '18rem' }}>
                <div
                  style={{
                    display: 'flex',

                    borderRedius: '50%',
                  }}
                >
                  <ReactPlayer url={item.img} style={{ width: '100px' }} />
                </div>

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
                  <Button
                    onClick={() =>
                      setId(comment[index + 2].id) &&
                      console.log('kkk' + comment[index].id)
                    }
                  >
                    load
                  </Button>
                  <Card.Link
                    index={index}
                    onClick={() =>
                      seeDetail(item.id) &&
                      console.log('kkk' + comment[index].id) &&
                      setId(comment[index].id)
                    }
                    href={`/tt/posts/${id}`}
                  >
                    see videos and comments
                  </Card.Link>
                  <Card.Link href='#'>Another Link</Card.Link>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
