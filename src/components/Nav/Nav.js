import './nav.css';
import { IconContext } from "react-icons";
import { FaBookOpen, FaList, FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

export default function Nav({ fsUser, auth }) {

  return (
    <IconContext.Provider value={{className: "react-icons-nav" }}>
      <div className='nav-container'>
        {
          fsUser ?
            fsUser.map(user => {
              return (
                <div key={user.uid} className="profile" >
                 <img src={user.photoURL} alt="profile"/>
                  <h4>Hi {user.displayName}</h4>
                </div>
              )
            })
            : <p>User Not Found</p>
        }
        <div className='nav-body'>
          <ul>
            <li><IoChatbubblesSharp/>Conversations</li>
            <li><IoPeopleCircleOutline />Matches</li>
            <li><FaList />My Details</li>
            <li><FaBookOpen />My Story</li>
          </ul>
        </div>
        <div className='log-out' onClick={() => auth.signOut()}><FaArrowLeft size="1rem" /><span className='text'>logout</span></div>
      </div>

    </IconContext.Provider>
  );

}
