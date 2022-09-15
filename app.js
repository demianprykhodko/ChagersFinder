const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const data = require("./uk_chargers.json");
console.log(data.ChargeDevice.length);
// console.log(data.ChargeDevice[0].ChargeDeviceId);
// console.log(data.ChargeDevice[0].ChargeDeviceLocation.Latitude);
// console.log(data.ChargeDevice[0].ChargeDeviceLocation.Longitude);
// console.log(data.ChargeDevice[0].ChargeDeviceLocation.LocationShortDescription);
// console.log(data.ChargeDevice[0].ChargeDeviceLocation.LocationLongDescription);
// console.log(data.ChargeDevice[0].Connector[0].ConnectorType);
// console.log(data.ChargeDevice[0].Connector[0].RatedOutputkW);
// console.log(data.ChargeDevice[0].Connector[0].ChargePointStatus);
// console.log(data.ChargeDevice[0].PaymentRequiredFlag)
// console.log(data.ChargeDevice[0].ParkingFeesFlag)
// console.log(data.ChargeDevice[0].Accessible24Hours)
// console.log(data.ChargeDevice[0].Connector[1].ConnectorType);


for (let index = 0; index < data.ChargeDevice.length; index++) {
  const id = data.ChargeDevice[index].ChargeDeviceId;
  const latitude = data.ChargeDevice[index].ChargeDeviceLocation.Latitude;
  const longitude = data.ChargeDevice[index].ChargeDeviceLocation.Longitude;
  const shortDesc =
    data.ChargeDevice[index].ChargeDeviceLocation.LocationShortDescription;
  const longDesc =
    data.ChargeDevice[index].ChargeDeviceLocation.LocationLongDescription;
  for (
    let index2 = 0;
    index2 < data.ChargeDevice[index].Connector.length;
    index2++
  ) {
    const type = data.ChargeDevice[index].Connector[index2].ConnectorType;
    const ratedOutput =
      data.ChargeDevice[index].Connector[index2].RatedOutputkW;
    const status = data.ChargeDevice[index].Connector[index2].ChargePointStatus;
  }
  const paymentRequired = data.ChargeDevice[index].PaymentRequiredFlag;
  const parkingFees = data.ChargeDevice[index].ParkingFeesFlag;
  const accessible24Hours = data.ChargeDevice[index].Accessible24Hours;
}


const connectDB = require("./db/connect");
const Chargers = require("./models/model");

// const notFound = require("./middleware/not-found");
// const customError = require("./middleware/error-handler");

const port = process.env.port || 5002;

const router = require("./routes/main");

//Middleware
app.use(express.static("./public"));
app.use(express.json());

//Middleware Error Handling
// app.use(notFound);
// app.use(customError);

app.use("/api/test", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Hello World");
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
