import './nav.css';
import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";

import logo from '../../assets/simpaticologogreenbg.jpg'

export default function Nav({ user, navHandler, fsUser }) {

  const navStyles = user ? "" : "no-user-nav";

  return (
    <IconContext.Provider value={{ className: "react-icons-nav" }}>
      <div className='nav-container'>
        <div className='logo-container'>
          <img src={logo} alt="Logo" />
          <p>Simpatico</p>
          <p>Finding Comfort in Shared Experiences</p>
        </div>
        <div className={'nav-body ' + navStyles}>
          <ul>
            <li data-identifier="Home" className="home-btn" onClick={e => navHandler("Home")}><IoHome /><span>Home</span></li>
            <li data-identifier="Matches" onClick={e => navHandler("Matches")}><IoPeopleCircleOutline /><span>Matches</span></li>
            <li data-identifier="Conversations" onClick={e => navHandler("Conversations")}><IoChatbubblesSharp /><span>Conversations</span></li>
            {
              fsUser && fsUser.admin === true ?
                <li data-identifier="Admin" onClick={e => navHandler("Admin")}><IoChatbubblesSharp /><span>Admin Dashboard</span></li>
                : null

            }
            <li className='log-out' onClick={e => navHandler('Logout')}><FaArrowLeft size="1rem" /><span>Logout</span></li>
            {/* <li>#MAKE A DONATION?</li> */}

          </ul>
        </div>
      </div>
    </IconContext.Provider>
  );

}
