import './dashboard.css';
import Questionaire from './Questionaire/Questionaire'


export default function Dashboard({user}) {


    return (
        <div className='dashboard-wrapper'>
            <Questionaire />
        </div>
    );
  
  }
  