import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <nav className='navBar'>
        <div className='navButtons'>
        </div>
      </nav>
    );
  }

  return (
    <nav >
      <NavLink exact to="/" className='home-button'>Home</NavLink>
      {isLoaded && sessionLinks}
      <NavLink to="/songs">Songs</NavLink>
      <NavLink to="/upload">Upload</NavLink>
      <NavLink to="/songs/1">Song 1</NavLink>
    </nav>

  );
}

export default Navigation;
