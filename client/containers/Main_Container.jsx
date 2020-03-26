import React, { useState, useEffect } from 'react';
import Pods from '../components/Pods';
import Nodes from '../components/Nodes';
import Services from '../components/Services';
import DashBoard from './Dashboard';
import axios from 'axios';

const Main_Container = () => {
  let [pod, setPod] = useState([]); //fetch pod data
  let [alert, setAlert] = useState(0);
  let [notif, setNotif] = useState('');

  // useEffect = Hook version of componentDidMount
  useEffect(() => {
    const fetchPods = async () => {
      // axios request to server side
      const result = await axios.get('/getPods');

      pod = []; //empty the pod before updating with fetched data
      setPod(pod.push(result.data));
      console.log('pods', pod);

      pod[0].map(p => {
        // check status - if not running then increment alert by 1;
        if (p.status !== 'Running') {
          setAlert((alert += 1));
        }
      });
      if (alert !== 0) {
        setNotif(alert);
      }
    };
    //call initial fetchPods and then update every 5 seconds
    const fetchOnLoad = () => {
      if (!pod[0]) {
        console.log('First fetch called');
        fetchPods();
      }
      setInterval(() => {
        console.log('setInterval called');
        fetchPods();
      }, 2000);
    };
    fetchOnLoad();
  }, []);

  return (
    <div className='appCont'>
      <DashBoard alert={notif} />
      <div className='mainContainer'>
        {/* <div className='router'></div> */}
        {/* <TestPod /> */}
        <Pods />
        <Nodes />
        <Services />
      </div>
    </div>
  );
};

export default Main_Container;
