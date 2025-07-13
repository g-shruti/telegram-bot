import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
    <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>Dashboard</Link>
    <Link to="/settings" style={{ color: 'white' }}>Settings</Link>
  </nav>
);

export default Navbar;
