var express = require("express");
var appS = express();
appS.use(express.static(__dirname + "/app"));
appS.listen(process.env.PORT || 3000);