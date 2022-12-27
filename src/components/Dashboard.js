import './dashboard.css';
// import Questionaire from './Questionaire/Questionaire'
import PrivateChat from './PrivateChat/PrivateChat'

export default function Dashboard({ firebase, user}) {

    //Account options: see your details and offer the chance to change them
    
    return (
        <div className='dashboard-wrapper'>
            <PrivateChat firebase={firebase}/>
        </div>
    );
  
  }
  