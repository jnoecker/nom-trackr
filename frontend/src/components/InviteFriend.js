import { useState } from 'react';
import axios from 'axios';

const InviteFriend = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleChangeName = ({ target }) => {
    setName(target.value);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleInviteFriend = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users/inviteFriend',
        withCredentials: true,
        data: {
          name,
          email,
        },
      });

      console.log(res);

      if (res.data.status === 'success') {
        alert('Invitation Successful');
      } else {
      }
    } catch (error) {
      console.log(error);
      alert('Failed to add food');
    }
  };
  return (
    <form>
      <input type="text" name="name" onChange={handleChangeName} />
      <input type="text" name="email" onChange={handleChangeEmail} />
      <button onClick={handleInviteFriend}>Invite Friend</button>
    </form>
  );
};

export default InviteFriend;
