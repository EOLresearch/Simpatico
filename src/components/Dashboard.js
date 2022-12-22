import './dashboard.css';
// import Questionaire from './Questionaire/Questionaire'
import PrivateChat from './PrivateChat/PrivateChat'

export default function Dashboard({ firebase, user}) {
    return (
        <div className='dashboard-wrapper'>
            <PrivateChat firebase={firebase}/>
        </div>
    );
  
  }
  