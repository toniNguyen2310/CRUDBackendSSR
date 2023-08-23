require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const connection = require("./config/database");
const app = express();
const fileUpload = require("express-fileupload");
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config
configViewEngine(app);

//khai bao route
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log("error connect to DB>>> ", error);
  }
})();
