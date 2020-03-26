import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import icon from '../assets/icon.png';

const Dashboard = props => {
  // render alert notification only if it's greater than 0;
  let n;
  if (props.alert === '' || props.alert === undefined) {
    n = null;
  } else {
    n = <span id='notifCircle'>{props.alert}</span>;
  }
  return (
    <div className='dashboard'>
      <img src={icon} alt='Logo' className='logo' />
      <Nav defaultActiveKey='' className='flex-column' id='navbar'>
        <Nav.Link href='/' className='dashHome'>
          Home
        </Nav.Link>
        <Nav.Link href='/cluster' className='dashCluster'>
          Cluster
        </Nav.Link>
        <Nav.Link href='/visualizer' className='dashTraffic'>
          Traffic
        </Nav.Link>
        <Nav.Link href='/alerts' className='dashAlerts'>
          Alerts&nbsp;&nbsp;{n}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Dashboard;
