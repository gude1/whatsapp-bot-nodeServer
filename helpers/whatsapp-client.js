const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { reportError } = require("../utils");

module.exports.config = () => {
  try {
    const client = new Client({
      // authStrategy: new LocalAuth({ clientId: "client-one" }),
    });

    global.whatsappclient = client;

    client.on("qr", (qr) => {
      console.log("newqrcode", qr);
      global.whatsappclient_qr = qr;
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      global.clientready = true;
      global.whatsappclient_qr = null;
    });

    client.on("message", (message) => {});

    client.on("disconnected", (state) => {});

    client.on("auth_failure", (message) => {
      console.log("auth_failure!", message);
      global.clientready = false;
    });

    client.initialize();
  } catch (error) {
    reportError("whatsapp-config", error);
  }
};
