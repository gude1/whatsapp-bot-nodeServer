const { reportError, isEmpty } = require("../utils");
const whatsappclient = require("../helpers/whatsapp-client");

exports.sendMessage = async (req, res, next) => {
  try {
    const { number, message } = req.body;
    let client = req.whatsappclient;
    if (!client || !global.clientready) {
      return res.status(400).json({
        success: false,
        error:
          "Whatsapp client is instantiating and not ready, could not process your request at this time please wait a few minutes and  try again",
      });
    }

    if (isEmpty(number) || isEmpty(message)) {
      return res.status(400).json({
        success: false,
        error:
          "Missing values to continue, please ensure all parameters are correct",
      });
    }

    const number_details = await client.getNumberId(number); // get mobile number details
    if (!number_details) {
      return res.status(400).json({
        success: false,
        error: "Phone number is not registered on whatsapp",
      });
    }

    await client.sendMessage(number_details._serialized, message);
    return res.status(200).json({
      success: true,
      message: "message sent!",
    });
  } catch (err) {
    reportError("sendMessagectrl err", err);
    return res.status(400).json({
      success: false,
      error: "something went wrong please try again",
    });
  }
};

exports.logOut = async (req, res, next) => {
  try {
    if (!req.whatsappclient || !global.clientready) {
      return res.status(400).json({
        success: false,
        error:
          "Whatsapp client is instantiating and not ready, could not process your request at this time, please wait a few minutes and  try again",
      });
    }
    await req.whatsappclient.logout();
    global.clientready = false;
    whatsappclient.config();

    return res.status(200).json({
      success: true,
      message: "log out succesful",
    });
  } catch (err) {
    reportError("logOut err", err);
    return res.status(400).json({
      success: false,
      error: "Failed to log client out, please try again",
    });
  }
};
