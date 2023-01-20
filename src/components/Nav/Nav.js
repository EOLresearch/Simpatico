import './nav.css';
import { IconContext } from "react-icons";
import { FaBookOpen, FaList, FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";

export default function Nav({ fsUser, auth, navHandler }) {

  return (
    <IconContext.Provider value={{ className: "react-icons-nav" }}>
      <div className='nav-container'>
        <div data-identifier="Home" className="home-btn" onClick={e => navHandler(e)}><IoHome /></div>
        {
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
        }
        <div className='nav-body'>
          <ul>
            <li data-identifier="Conversations" onClick={e => navHandler(e)}><IoChatbubblesSharp />Conversations</li>
            <li data-identifier="Matches"  onClick={e => navHandler(e)}><IoPeopleCircleOutline />Matches</li>
            <li data-identifier="My Details" onClick={e => navHandler(e)}><FaList />My Details</li>
            <li data-identifier="My Story" onClick={e => navHandler(e)}><FaBookOpen />My Story</li>
          </ul>
        </div>
        <div className='log-out' onClick={() => auth.signOut()}><FaArrowLeft size="1rem" /><span className='text'>logout</span></div>
      </div>

    </IconContext.Provider>
  );

}
