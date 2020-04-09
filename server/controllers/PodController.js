const { kube } = require('../kubeconfig');
const { PodQuery } = require('../query/PodQuery');
const cmd = require('node-cmd');

const PodController = {};

PodController.getPods = (req, res, next) => {
  // grabbing data from kube api
  kube.listNamespacedPod('default').then((data) => {
    const result = new PodQuery(data);
    const podArray = [];
    for (let i = 0; i < result.name.length; i++) {
      let obj = {
        name: result.name[i],
        namespace: result.namespace[i],
        status: result.status[i],
        podIP: result.podIP[i],
        createdAt: result.createdAt[i].toString(),
        nodeName: result.nodeName[i],
        labels: result.labels[i],
      };
      podArray.push(obj);
    }
    res.locals.pod = podArray;
    return next();
  });
};


PodController.getPodUsage = (req, res, next) => {
  //cmd library to access CLI
  //using kubectl top pod
  cmd.get('kubectl top pod',
    function(err, data, stderr){
       if (err) return next(err);

        //split by enter
        const lines = data.split('\n');

        const result = [];
        for (let i = 1; i < lines.length - 1; i++) {
          //use regex, split string by any number of whitespaces
          const words = lines[i].match(/\S+/g) 
          const podUse = { name: words[0], cpu: words[1], memory: words[2] };
          result.push(podUse);
        }
        res.locals.usage = result;
        return next();
    }
  );
}

module.exports = PodController;
