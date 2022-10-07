//Join chat page
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './C2';
import { useAuth } from '../contexts/AuthContext';
import './C1.css';
import { Button } from 'react-bootstrap';
const socket = io.connect('http://localhost:3005');

function C1() {
  const [username, setUsername] = useState('');
  const { currentUser, logout } = useAuth();
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  console.log(currentUser.email);

  //make sure there are username and room number
  const joinRoom = () => {
    setUsername(currentUser.email);
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className='App'>
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Join A Chat</h3>
          <input
            type='text'
            value={currentUser.email}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type='text'
            placeholder='Room ID...'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default C1;
