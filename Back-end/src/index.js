const express = require("express"); // import express module
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const getUniqueCode = require("./hashing");

app.use(cors());
const PORT = 8000; // Set up an app listen port
const URL = "localhost:8000/hashurl";

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect with mongoDB through mongoose
mongoose
  .connect("mongodb://localhost/news_bytes")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("Error occured", err));

//create schema for long url
const urlSchema = new mongoose.Schema({
  longUrl: String,
  hashUrl: String,
});

// create model using schema
const HashURL = mongoose.model("url_datas", urlSchema);

//api for getting hash url
app.post("/hashing.api.co/v1/url", (req, res) => {
  const longUrl = req.body.longUrl;
  HashURL.findOne({ longUrl: longUrl })
    .then((record) => {
      if (record) {
        res.send(record);
      } else {
        const uniqueCode = getUniqueCode();
        const hashUrl = `${URL}/${uniqueCode}`;
        const obj = {
          longUrl,
          hashUrl,
        };
        const newHashURL = new HashURL(obj);
        newHashURL.save().then((result) => {
          res.send(result);
        });
      }
    })
});

//route for redirect to long url
app.get("/hashurl/:uniqueCode", (req, res) => {
  const uniqueCode = req.params.uniqueCode;
  const hashUrl = `${URL}/${uniqueCode}`;
  HashURL.findOne({ hashUrl: hashUrl }).then((record) => {
    if (!record) {
      res.status(404).send("Wrong URL");
    }
    res.redirect(record.longUrl);
  });
});

//listening port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
