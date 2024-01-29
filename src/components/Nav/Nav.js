import React from 'react';
import PropTypes from 'prop-types';
import './nav.css';
import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import logo from '../../assets/simpaticologogreenbg.jpg';


const NavItem = ({ identifier, icon, label, onClick, style }) => (
  <li data-identifier={identifier} onClick={onClick} className={style}>
    {icon}
    <span>{label}</span>
  </li>
);

const Nav = ({ user, navHandler }) => {
  const navStyles = user ? "" : "no-user-nav";

  return (
    <IconContext.Provider value={{ className: "react-icons-nav" }}>
      <div className='nav-container'>
        <img src={logo} alt="Logo" />
        <div className='inner-container'>
          <p>Simpatico</p>
          <p>Finding Comfort in Shared Experiences</p>
          <div className={'nav-body ' + navStyles}>
            <ul>
              <NavItem identifier="Logout" icon={<FaArrowLeft size="1rem" />} label="Logout" onClick={() => navHandler("Logout")} />
              <NavItem identifier="Account" icon={<RiUserSettingsLine size="1rem" />} label="Account options" onClick={() => navHandler("Account")} />
              <NavItem identifier="adminDash" icon={<IoPeopleCircleOutline size="1rem" />} label="Admin Dashboard" onClick={() => navHandler("adminDash")} />
            </ul>
          </div>
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