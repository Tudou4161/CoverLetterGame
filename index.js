// ========= library import ============
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const config = require("./config.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
// ====== create app & server
const app = express();

//=========== dependencies
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.set("port", config.PORT || 8003);
nunjucks.configure("views", {
    express: app,
    watch: true,
});

console.log(config.DB_URL2);
mongoose.connect(config.DB_URL2);

let db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
    console.log('connected to mongodb server')
});


app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 요청 대기 중 ....");
});

app.use("/api/v1/user", 
    require("./routes/user/user.controller"));
app.use("/api/v1/version", 
    require("./routes/version/versionStorage.controller"));
app.use("/api/v1/file", 
    require("./routes/file/fileStorage.controller")); 
