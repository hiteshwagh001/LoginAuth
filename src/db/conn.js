const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/Registration",{
    UseNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((e) => {
    console.log("no connection");
  });
