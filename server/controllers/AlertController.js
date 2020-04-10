const { Alert } = require('../models/alertModel');
const AlertController = {};

AlertController.getAlerts = (req, res, next) => {
  Alert.find({})
    .exec()
    .then(results => {
      res.locals.alerts = results;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Middleware error: getAlerts',
        message: { err: 'error occurred' },
      });
    });
};

AlertController.addAlerts = (req, res, next) => {
  const alertInfo = {
    name: req.body.name,
    namespace: req.body.namespace,
    status: req.body.status,
    podIP: req.body.podIP,
    time: req.body.time,
  };
  //check for duplicates - still getting some duplicates since the time is logging by second.
  Alert.findOneAndUpdate(
    alertInfo,
    alertInfo,
    { upsert: true },
    (err, result) => {
      if (err) return err;
      res.locals.newAlert = result;
      return next();
    }
  );
};

module.exports = AlertController;
