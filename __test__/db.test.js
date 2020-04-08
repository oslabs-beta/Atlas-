const mongoose = require('mongoose');
const alertModel = require('../server/models/alertModel');
const alertData = { name: 'Test String', namespace: 'Kube Namespace', status: 'running', podIP: '0123456', time: 'current time' };

describe('User Model Test', () => {

//     beforeAll(async () => {
//         await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//             if (err) {
//                 console.error(err);
//                 process.exit(1);
//             }
//         });
//     });
//   afterAll(async () => {
//     mongoose.disconnect();
//   })
    
    it('create & save alert successfully', async () => {
        const validAlert = await new alertModel(alertData);
        const savedAlert = await validAlert.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedAlert._id).toBeDefined();
        expect(savedAlert.name).toBe(alertData.name);
        expect(savedAlert.namespace).toBe(alertData.namespace);
        expect(savedAlert.status).toBe(alertData.status);
        expect(savedAlert.podIP).toBe(alertData.podIP);
        expect(savedAlert.time).toBe(alertData.time);
    });


    // We shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const alertWithInvalidField = await new alertModel({ name: 'Test String', namespace: 'Kube Namespace', status: 'running', podIP: '0123456', time: 'current time',  nickkname: 'aws Pod'});
        const savedAlertWithInvalidField = await alertWithInvalidField.save();
        expect(savedAlertWithInvalidField.name).toBeDefined();
        expect(savedAlertWithInvalidField.namespace).toBeDefined();
        expect(savedAlertWithInvalidField.status).toBeDefined();
        expect(savedAlertWithInvalidField.podIP).toBeDefined();
        expect(savedAlertWithInvalidField.time).toBeDefined();
        expect(savedAlertWithInvalidField.nickkname).toBeUndefined();
    });

  
    // It should not let us create without required fields
    it('create alert without required field should failed', async () => {
        const alertWithoutRequiredField = await new alertModel({ name: 'Test String', status: 'running', podIP: '0123456', time: 'current time' });
        let err;
        try {
            const savedAlertWithoutRequiredField = await alertWithoutRequiredField.save();
            error = savedAlertWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.namespace).toBeDefined();
    });
})