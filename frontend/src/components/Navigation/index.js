import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';


function Navigation({ user }) {
  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <nav className='Nav-bar'>
        <NavLink exact to="/" className='home-button'>Home</NavLink>
          <div>
            <NavLink exact to="/songs">Songs</NavLink>
          </div>
          <div>
            <NavLink to="/upload">Upload</NavLink>
          </div>
      <button onClick={openMenu}>
        <i id="icon" className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <p>{user.username}</p>
          <p>{user.email}</p>

          <button className="button" onClick={logout}>Log Out</button>
        </div>
      )}
      </nav>
    </div>
  );
}

export default Navigation;
