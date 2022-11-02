import { useState } from 'react';
import axios from 'axios';

const LoginBox = ({ setUser }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users/login',
        data: {
          email: userName,
          password,
        },
        withCredentials: true,
      });

      console.log(res);
      if (res.data.status === 'success') {
        console.log(res.data.data.user);
        console.log(event.target);
        console.log(setUser);
        setUser(res.data.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.data.user));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleInputUserName = ({ target }) => {
    setUserName(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        value={userName}
        onChange={handleInputUserName}
      ></input>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputPassword}
      ></input>
      <button>Log In</button>
    </form>
  );
};

export default LoginBox;
