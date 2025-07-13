import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
    setUsers(res.data);
  };

  const blockUser = async (id) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${id}/block`);
    fetchUsers(); // refresh
  };

  const deleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`);
    fetchUsers(); // refresh
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Subscribed Users</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>City</th>
            <th>Blocked?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4">No users found</td></tr>
          ) : (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.username || 'N/A'}</td>
                <td>{user.city}</td>
                <td>{user.isBlocked ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => blockUser(user._id)}>
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button onClick={() => deleteUser(user._id)} style={{ marginLeft: '10px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
