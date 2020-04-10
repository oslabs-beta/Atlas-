//traffic view of kubernetes clusters/individual pods
import React from 'react';
import RadialTree from '../components/visualizer/RadialTree.jsx';

const Visualizer = (props) => {
  let data = [props.data[1]];

  return (
    <div className='visContainer'>
      <h4>Traffic Visualizer</h4>
      <RadialTree data={data} />
    </div>
  );
};

export default Visualizer;
