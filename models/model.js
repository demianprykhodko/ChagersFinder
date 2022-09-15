const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
  ChargeDeviceId: {
    type: String,
  },
  ChargeDeviceLatitude: {
    type: String,
  },
  ChargeDeviceLongitude: {
    type: String,
  },
  ChargeDeviceShortDescription: {
    type: String,
  },
  ChargeDeviceLongDescription: {
    type: String,
  },
  Connector: [{
    ConnectorType: {
      type: String,
    },
    RatedOutputkW: {
      type: String,
    },
    ChargePointStatus: {
      type: String,
    },
  }],
  PaymentRequiredFlag: {
    type: Boolean,
  },
  ParkingFeesFlag: {
    type: Boolean,
  },
  Accessible24Hours: {
    type: Boolean,
  },
});
  
module.exports = mongoose.model('Chargers', chargerSchema)