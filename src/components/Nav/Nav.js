import './nav.css';
import { IconContext } from "react-icons";
import { FaBookOpen, FaList, FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";

export default function Nav({ fsUser, auth, navHandler }) {

  return (
    <IconContext.Provider value={{ className: "react-icons-nav" }}>
      <div className='nav-container'>
        {/* {
          fsUser ?
          fsUser.map(user => {
            return (
              <div key={user.uid} className="profile" >
                  <img src={user.photoURL} alt="profile" />
                  <h4>Hi {user.displayName}</h4>
                </div>
              )
            })
            : null
          } */}
        <div className='nav-body'>
          <ul>
            <li data-identifier="Home" className="home-btn" onClick={e => navHandler("Home")}><IoHome />Home</li>
            <li data-identifier="Matches"  onClick={e => navHandler("Matches")}><IoPeopleCircleOutline />Matches</li>
            <li data-identifier="Conversations" onClick={e => navHandler("Conversations")}><IoChatbubblesSharp />Conversations</li>
            <li data-identifier="Matching Survey" onClick={e => navHandler("Matching Survey")}><FaList />Matching Survey</li>
            {/* <li data-identifier="My Story" onClick={e => navHandler(e)}><FaBookOpen />---</li> */}
            <li className='log-out' onClick={() => auth.signOut()}><FaArrowLeft size="1rem" /><span className='text'>logout</span></li>
            {/* <li>#MAKE A DONATION?</li> */}
          </ul>
        </div>
      </div>

    </IconContext.Provider>
  );

}
