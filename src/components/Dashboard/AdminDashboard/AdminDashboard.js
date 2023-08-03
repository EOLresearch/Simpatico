import './admindashboard.css';
import UserDisplay from './UserDisplay/UserDisplay';
import { useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../../firebase-config';
import PropTypes from 'prop-types';

function AdminDashboard({ fsUser, navHandler }) {
  // const [view, setView] = useState('Cards');

  useEffect(() => {
    if (!fsUser.admin || fsUser.admin === false) {
      navHandler('Home');
    }
  }, [fsUser, navHandler]);

  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);

  // Placeholder for view switching feature
  // const renderView = () => {
  //   switch (view) {
  //     case 'Cards':
  //   }
  // };

  return (
    <div className='admin-dashboard-container'>
      <div className='admin-dashboard'>
        <div className='admin-dashboard-header'>
          <h1>Admin Dashboard</h1>
          {/* <div className='admin-dashboard-nav'>
            <button onClick={() => setView('Cards')}>Card View</button>
            <button onClick={() => setView('Table')}>Table View</button>
          </div> */}
        </div>
        <div className='admin-dashboard-body'>
          <UserDisplay users={users} />
        </div>
      </div>
    </div>
  );
}
AdminDashboard.propTypes = {
  fsUser: PropTypes.object.isRequired,
  navHandler: PropTypes.func.isRequired,
};
export default AdminDashboard;