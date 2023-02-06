import './nav.css';
import { IconContext } from "react-icons";
import { FaBookOpen, FaList, FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";

export default function Nav({ fsUser, auth, navHandler }) {

  return (
    <IconContext.Provider value={{ className: "react-icons-nav" }}>
      <div className='nav-container'>
        <div className='logo-container'>
          <div className='logo-placeholder'><p>Logo Placeholder</p></div>
        </div>
        <div className='nav-body'>
          <ul>
            <li data-identifier="Home" className="home-btn" onClick={e => navHandler("Home")}><IoHome /><span>Home</span></li>
            <li data-identifier="Matches"  onClick={e => navHandler("Matches")}><IoPeopleCircleOutline /><span>Matches</span></li>
            <li data-identifier="Conversations" onClick={e => navHandler("Conversations")}><IoChatbubblesSharp /><span>Conversations</span></li>
            <li data-identifier="Matching Survey" onClick={e => navHandler("Matching Survey")}><FaList /><span>Matching Survey</span></li>
            {/* <li data-identifier="My Story" onClick={e => navHandler(e)}><FaBookOpen />---</li> */}
            <li className='log-out' onClick={() => auth.signOut()}><FaArrowLeft size="1rem" /><span>logout</span></li>
            {/* <li>#MAKE A DONATION?</li> */}
          </ul>
        </div>
      </div>

    </IconContext.Provider>
  );

}
