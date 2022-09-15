require("dotenv").config();

const connectDB = require("./db/connect");
const Chargers = require("./models/model");

const data = require("./uk_chargers.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Chargers.deleteMany();
    var charger = {};
    var Connector = [];
    for (let index = 0; index < data.ChargeDevice.length; index++) {
      var ChargeDeviceId = data.ChargeDevice[index].ChargeDeviceId;
      var ChargeDeviceLatitude =
        data.ChargeDevice[index].ChargeDeviceLocation.Latitude;
      var ChargeDeviceLongitude =
        data.ChargeDevice[index].ChargeDeviceLocation.Longitude;
      var ChargeDeviceShortDescription =
        data.ChargeDevice[index].ChargeDeviceLocation.LocationShortDescription;
      var ChargeDeviceLongDescription =
        data.ChargeDevice[index].ChargeDeviceLocation.LocationLongDescription;
      for (
        let index2 = 0;
        index2 < data.ChargeDevice[index].Connector.length;
        index2++
      ) {
        var ConnectorType =
          data.ChargeDevice[index].Connector[index2].ConnectorType;
        var RatedOutputkW =
          data.ChargeDevice[index].Connector[index2].RatedOutputkW;
        var ChargePointStatus =
          data.ChargeDevice[index].Connector[index2].ChargePointStatus;
        var obj = { ConnectorType, RatedOutputkW, ChargePointStatus };
        Connector.push(obj);
      }
      const PaymentRequiredFlag = data.ChargeDevice[index].PaymentRequiredFlag;
      const ParkingFeesFlag = data.ChargeDevice[index].ParkingFeesFlag;
      const Accessible24Hours = data.ChargeDevice[index].Accessible24Hours;
      charger = {
        ChargeDeviceId,
        ChargeDeviceLatitude,
        ChargeDeviceLongitude,
        ChargeDeviceShortDescription,
        ChargeDeviceLongDescription,
        Connector,
        PaymentRequiredFlag,
        ParkingFeesFlag,
        Accessible24Hours,
      };
        await Chargers.create(charger);
        Connector = [];
    }
    console.log("chargers added");
  } catch (error) {
    console.log(error);
  }
};

start();
