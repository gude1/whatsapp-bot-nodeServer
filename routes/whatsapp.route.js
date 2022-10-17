const express = require("express");
const { sendMessage, logOut } = require("../controllers/whatsapp.controller");
const router = express.Router();

router.post("/", sendMessage);
router.get("/qr", (req, res) => {
  console.log(global.clientready, global.whatsappclient_qr);
  res.render("qr", {
    qr: global.whatsappclient_qr,
    clientready: global.clientready ? "yes" : "no",
    clientauthenticated: global.clientauthenticated ? "yes" : "no",
  });
});
router.route("/logout").get(logOut).post(logOut);

module.exports = router;
