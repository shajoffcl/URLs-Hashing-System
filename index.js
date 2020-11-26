const express=require('express'); // import express module
const app=express();
const bodyParser = require("body-parser");
const PORT=3000; // Set up an app listen port


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/hashing.url.api/v1/welcome", (req, res)=>{
    res.send("Hello world!");
});

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}!`);
});
