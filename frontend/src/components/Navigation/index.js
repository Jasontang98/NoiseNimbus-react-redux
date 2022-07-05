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
          <div className="songNav" >
            <NavLink id="songNavName" exact to="/songs">Songs</NavLink>
          </div>
          <div className="uploadNav">
            <NavLink id="uploadNavName" to="/upload">Upload</NavLink>
          </div>
      <button className="profile-button" onClick={openMenu}>
        <i id="icon" className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <p id="profileUser">{user.username}</p>

          <button id="logout" onClick={logout}>Log Out</button>
        </div>
      )}
      </nav>
    </div>
  );
}

export default Navigation;
