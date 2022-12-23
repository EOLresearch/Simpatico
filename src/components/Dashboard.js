import './dashboard.css';
// import Questionaire from './Questionaire/Questionaire'
import PrivateChat from './PrivateChat/PrivateChat'

export default function Dashboard({ auth, firestore, user}) {
    return (
        <div className='dashboard-wrapper'>
            <PrivateChat auth={auth} firestore={firestore} />
        </div>
    );
  
  }
  