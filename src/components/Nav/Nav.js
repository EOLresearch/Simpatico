import React from 'react';
import PropTypes from 'prop-types';
import './nav.css';
import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";
import logo from '../../assets/simpaticologogreenbg.jpg';

const Logo = () => (
  <div className='logo-container'>
    <img src={logo} alt="Logo" />
    <p>Simpatico</p>
    <p>Finding Comfort in Shared Experiences</p>
  </div>
);

const NavItem = ({ identifier, icon, label, onClick }) => (
  <li data-identifier={identifier} onClick={onClick}>
    {icon}
    <span>{label}</span>
  </li>
);

const Nav = ({ user, navHandler, fsUser }) => {
  const navStyles = user ? "" : "no-user-nav";

  return (
    <IconContext.Provider value={{ className: "react-icons-nav" }}>
      <div className='nav-container'>
        <Logo />
        <div className={'nav-body ' + navStyles}>
          <ul>
            <NavItem identifier="Home" icon={<IoHome />} label="Home" onClick={() => navHandler("Home")} />
            <NavItem identifier="Matches" icon={<IoPeopleCircleOutline />} label="Matches" onClick={() => navHandler("Matches")} />
            <NavItem identifier="Conversations" icon={<IoChatbubblesSharp />} label="Conversations" onClick={() => navHandler("Conversations")} />
            {fsUser && fsUser.admin === true && (
              <NavItem identifier="Admin" icon={<IoChatbubblesSharp />} label="Admin Dashboard" onClick={() => navHandler("Admin")} />
            )}
            <NavItem identifier="Logout" icon={<FaArrowLeft size="1rem" />} label="Logout" onClick={() => navHandler("Logout")} />
          </ul>
        </div>
      </div>
    </IconContext.Provider>
  );
};

Nav.propTypes = {
  user: PropTypes.object,
  navHandler: PropTypes.func.isRequired,
  fsUser: PropTypes.object
};

export default Nav;