const WhatsappClient = require("../helpers/whatsapp-client");

exports.startWhatsappClient = async (req, res, next) => {
  try {
    req.whatsappclient = await WhatsappClient.config();
    next();
  } catch (err) {
    reportError("startWhatsappClient", err);
    return res.status(400).json({
      success: false,
      error: "connection failed please try again",
    });
  }
};
