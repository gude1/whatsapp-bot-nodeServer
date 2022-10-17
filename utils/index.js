function isEmpty(data) {
  if (!checkData(data)) return true;
  if (data.constructor == Array && data.length < 1) return true;
  else if (data.constructor == String && data.length < 1) return true;
  else if (data.constructor == Object && Object.keys(data).length == 0)
    return true;
  else return false;
}

function checkData(data) {
  if ((data != null && data != undefined && data != "") || data == "0") {
    return true;
  }
  return false;
}

async function sendWhatsAppMessageToNum(client, number, data) {
  try {
    number = "2348099603816";
    const number_details = await client.getNumberId(number); // get mobile number details

    if (number_details) {
      const sendMessageData = await client.sendMessage(
        number_details._serialized,
        data.message
      ); // send message
      console.log("messae sesnt");
    } else {
      console.log(number, "Mobile number is not registered");
    }
  } catch (error) {
    reportError("sendWhatsAppMessageToNumerr", error);
  }
}

/**
 * This function takes an error object and outputs it to the console
 *
 * @param {*} err error object
 * @param {*} name name attributed to the error
 * @returns null
 */
function reportError(name = "reportError", err = {}) {
  if (!isEmpty(err)) {
    console.error(name, {
      errmsg: String(err),
      errdata: err?.response?.data,
    });
    // throw new Error(err);
  }
}

function returnSwaggerOptions() {
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Whatsapp bot server api",
        version: "1.0.0",
        description:
          "Connect your whatsapp and send automated messages via this api",
        contact: {
          name: "Gideon Owolabi",
          url: "https://github.com/gude1",
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 4000}/api/v1`,
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
}

module.exports = {
  isEmpty,
  sendWhatsAppMessageToNum,
  reportError,
  returnSwaggerOptions,
};
