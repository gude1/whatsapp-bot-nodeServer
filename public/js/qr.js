import QrCreator from "https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js";

let qrcode = document.getElementById("qrcode").innerText;
let clientready = document.getElementById("clientready").innerText;
let clientauthenticated = document.getElementById(
  "clientauthenticated"
).innerText;
let qrdiv = document.getElementById("qr-div");

if (!qrcode && clientready != "yes" && clientauthenticated != "yes") {
  qrdiv.innerHTML =
    "<b>Failed to load relevant info, the server is taking a while to process info, continue refreshing your browser till changes occur</b>";
} else if (clientready == "yes") {
  qrdiv.innerHTML =
    "<b>Whatsapp Client connected <a href='http://localhost:4000/api/v1/logout'>LOGOUT</a> &nbsp &nbsp <a href='http://localhost:4000/api-docs'> API Docs</a> </b>";
} else if (clientauthenticated == "yes") {
  qrdiv.innerHTML =
    "<b>Whatsapp client authenticated, please wait a few minutes for whatsapp to instantiate...</b>";
} else {
  QrCreator.render(
    {
      text: `${qrcode}`,
      radius: 0.5, // 0.0 to 0.5
      ecLevel: "H", // L, M, Q, H
      fill: "#000", // foreground color
      background: null, // color or null for transparent
      size: 300, // in pixels
    },
    qrdiv
  );
}
