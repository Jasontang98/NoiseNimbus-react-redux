import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginModal';
import SignupFormModal from '../SignupFormModal/SignupModal';


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
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </nav>
    );
  }

  return (
    <nav className='navBar'>
      <NavLink exact to="/" className='home-button'>Home</NavLink>
      {isLoaded && sessionLinks}
    </nav>

  );
}

export default Navigation;
