import React, { useState, useEffect } from 'react';
import { BrowserRouter as useParams } from 'react-router-dom';
import axios from 'axios';

import Loader from '../components/Loader.jsx';
import Visualizer_Container from './Visualizer_Container.jsx';
import Alerts_Container from './Alerts_Container.jsx';
import Cluster_Container from './Cluster_Container.jsx';

const Main_Container = ({ path }) => {
  //data to pass to children | pod, node, and service will fetched and put into data
  //stillLoading and donFetching at booleans to check check if loading is finalized and throw appropriate loader
  let [data, setData] = useState([]);
  let [pod, setPod] = useState([]);
  let [podUsage, setPodUsage] = useState([]);
  let [node, setNode] = useState([]);
  let [service, setService] = useState([]);
  let [stillLoading, setStillLoading] = useState(true);
  let [doneFetching, setdoneFetching] = useState(false);

  //function to parse pod usage info
  function getPodUsage(name) {
    for (let i = 0; i < podUsage.length; i++) {
      //if pod name matches, include usage information 
      if (name == podUsage[i].name) {
        return { cpu: podUsage[i].cpu, memory: podUsage[i].memory };
      }
    }
  }
  //function to parse info back from /getPods
  function getPods(parent) {
    const podArr = [];
    for (let i = 0; i < pod.length; i++) {
      //check node name passed thru parameter against pod's nodeName
      if (parent == pod[i].nodeName) {
        const podObj = {};
        podObj.name = pod[i].name;
        podObj.namespace = pod[i].namespace;
        podObj.status = pod[i].status;
        podObj.podIP = pod[i].podIP;
        podObj.createdAt = pod[i].createdAt;
        podObj.parent = pod[i].nodeName;
        podObj.labels = pod[i].labels;
        podObj.usage = getPodUsage(pod[i].name); //object with cpu and memory properties
        podArr.push(podObj);
      }
    }
    return podArr;
  }
  //function to parse info back from /getNods and push pods from getPods function
  function getNodes() {
    const nodeArr = [];
    for (let i = 0; i < node.length; i++) {
      const nodeObj = {};
      nodeObj.name = node[i].name;
      nodeObj.cpu = node[i].cpu;
      //pods/children related to the node
      nodeObj.children = getPods(node[i].name);
      nodeArr.push(nodeObj);
    }
    return nodeArr;
  }
  //function to parse info back from /getServices and place child nodes on relavant obj
  function getServices() {
    const serviceArr = [];
    for (let i = 0; i < service.length; i++) {
      const serviceObj = {};
      //copy all info from services into serviceObj
      serviceObj.name = service[i].name;
      serviceObj.type = service[i].type;
      serviceObj.namespace = service[i].namespace;
      serviceObj.port = service[i].port;
      serviceObj.clusterIP = service[i].clusterIP;
      serviceObj.children = getNodes();

      serviceArr.push(serviceObj);
    }
    return serviceArr;
  }
  //
  let setInt;
  useEffect(() => {
    // fetch service, node, pod info
    const fetchInfo = async () => {
      service = [];
      node = [];
      pod = [];
      podUsage = [];

      const serviceReq = axios.get('/api/services');
      const nodeReq = axios.get('/api/nodes');
      const podReq = axios.get('/api/pods');

      const res = await axios.all([serviceReq, nodeReq, podReq]);

      //set returned data as constants - identify based on their index
      const serviceRes = res[0].data;
      const nodeRes = res[1].data;
      const podRes = res[2].data.pod; //data on pods
      const podUsageRes = res[2].data.usage; //data on pod usage

      setService(service.push(...serviceRes));
      setNode(node.push(...nodeRes));
      setPod(pod.push(...podRes));
      setPodUsage(podUsage.push(...podUsageRes));

      setData(getServices()); //set data
      //data has been fetched and Loader component will through new animation
      setdoneFetching(true);
    };
    // fetching data call for initial load and every 3 seconds

    (function fetchOnLoad() {
      if (!data[0]) {
        fetchInfo();
      }

      setInt = setInterval(() => {
        fetchInfo();
      }, 3000);
    })();
    //clear settimeout when component is removed from dom
    return () => clearInterval(setInt);
  }, [data, path]);

  return (
    <div className='appCont'>
      <div className='mainContainer'>
        {stillLoading ? (
          <Loader
            setStillLoading={setStillLoading}
            doneFetching={doneFetching}
            path={path}
          />
        ) : path === '/visualizer' ? (
          <Visualizer_Container data={data} />
        ) : path === '/alerts' ? (
          <Alerts_Container />
        ) : (
          <Cluster_Container data={data} />
        )}
      </div>
    </div>
  );
};

export default Main_Container;
