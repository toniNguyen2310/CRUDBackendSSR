require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config
configViewEngine(app);

//khai bao route
app.use("/", webRoutes);

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
