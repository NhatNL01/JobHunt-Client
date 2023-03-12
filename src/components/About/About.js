import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { GuestNavLinks } from '../MainNavigation/NavLinks/GuestNavLinks';
import './About.css';

const About = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className='about'>
      <p className='about__bold'>
        <Link to='/' className='about__bold--co hvr-underline'>
          JobHunt
        </Link>{' '}
        is a job social networking website
      </p>
      <p>
        Manage your professional identity. Build and engage with your professional network. Access knowledge, insights and opportunities.
      </p>
      <ul className='about__links'>{!isLoggedIn && <GuestNavLinks />}</ul>
    </div>
  );
};

export default About;
