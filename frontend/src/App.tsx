import { useState } from 'react';
import axios from 'axios';
import './App.css';
import useSocket from './hooks/useSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const socket = useSocket();
  socket.on('test', () => {});


  const getUsers = () => {
    axios
      .get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addUser = () => {
    const newUser = { name: newUserName };

    axios
      .post('http://localhost:5000/users', newUser)
      .then(response => {
        console.log(response.data);
        setNewUserName('');
        getUsers(); // Refresh the user list after adding a new user
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <p className="read-the-docs">
        Click on the button to get the list of users from the server
      </p>
      <div className="card">
        <button onClick={getUsers}>Get Users</button>
      </div>
      <div className="users">
        {users.map( (user : any) => {
          return <div key={user.id}>{user.name}</div>;
        })}
      </div>
      <div className="add-user">
        <input
          type="text"
          value={newUserName}
          onChange={event => setNewUserName(event.target.value)}
          placeholder="Enter user name"
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </>
  );
}

export default App;
