const { kube } = require('../kubeconfig');
const { ServiceQuery } = require('../query/ServiceQuery');

const ServiceController = {};

ServiceController.getServices = (req, res, next) => {
  //get data from kube api
  kube.listNamespacedService('default').then(data => {
    const result = new ServiceQuery(data);
    const serviceArray = [];
    for (let i = 0; i < result.name.length; i++) {
      let obj = {
        name: result.name[i],
        type: result.type[i],
        namespace: result.namespace[i],
        port: result.port[i],
        clusterIP: result.clusterIP[i],
      };
      serviceArray.push(obj);
    }
    res.locals.service = serviceArray;
    return next();
  });
};

module.exports = ServiceController;
