import './nav.css';
import { IconContext } from "react-icons";
import { FaBookOpen, FaList } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

export default function Nav({ fsUser }) {

  return (
    <IconContext.Provider value={{className: "react-icons-nav" }}>
      <div className='nav-container'>
        {
          fsUser ?
            fsUser.map(user => {
              return (
                <div key={user.uid} className="profile" >
                  <h4>Hi {user.displayName}</h4>

                </div>
              )
            })
            : <p>User Not Found</p>
        }
        <div className='nav-body'>
          <ul>
            <li><FaBookOpen />My Story</li>
            <li><FaList />My Details</li>
            <li><IoPeopleCircleOutline />Matches</li>
            <li><IoChatbubblesSharp/>Conversations</li>
          </ul>
        </div>
      </div>

    </IconContext.Provider>
  );

}
