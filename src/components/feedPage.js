import React, { useEffect, useState, useRef } from 'react';
import '../page/Test.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './styles.css';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { AiOutlineSearch } from 'react-icons/ai';
import CloseButton from 'react-bootstrap/CloseButton';
import { Icon, Input } from 'semantic-ui-react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import axios from 'axios';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
//import { Container, Grid, Image } from 'semantic-ui-react';

import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { list, StringFormat } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getPosts } from '../services/posts';

export function FeedPage() {
  const [postss, setPosts] = useState([]);
  const [loadings, setLoading] = useState(false);
  const [option, setOption] = useState();
  const [id, setId] = useState();

  const { loading, error, value: posts } = useAsync(getPosts);

  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setOption(0);
    setLoading(true);

    //console.log('fdfsfds' + postss);
    //setComment(postss);

    //get Notice from database

    const unsub = onSnapshot(
      collection(db, 'Notice'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPosts(list);
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
    <>
      <div style={{ marginBottom: '30px' }}>
        <h1>Notification List</h1>
      </div>
      {postss.map((item) => (
        <Card style={{ width: '500px' }}>
          <Card.Body>{item.Notice}</Card.Body>
          <Card.Body>{item.Date}</Card.Body>
        </Card>
      ))}
    </>
  );
}
