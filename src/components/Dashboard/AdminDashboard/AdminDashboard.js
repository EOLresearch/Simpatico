import './admindashboard.css';
import UserDisplay from './UserDisplay/UserDisplay';
import { useEffect } from "react";
import PropTypes from 'prop-types';

function AdminDashboard({ fsUser, navHandler }) {
  // const [view, setView] = useState('Cards');

  useEffect(() => {
    if (!fsUser.admin || fsUser.admin === false) {
      navHandler('Home');
    }
  }, [fsUser, navHandler]);


  // Placeholder for view switching feature
  // const renderView = () => {
  //   switch (view) {
  //     case 'Cards':
  //   }
  // }

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
          <UserDisplay  />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;