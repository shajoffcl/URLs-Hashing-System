const express=require('express'); // import express module
const app=express();
const bodyParser = require("body-parser");
const PORT=3000; // Set up an app listen port
const mongoose=require('mongoose');

const getUniqueUrl=require('./hashing');



// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//connect with mongoDB through mongoose
mongoose.connect('mongodb://localhost/news_bytes')
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log('Error occured', err));

//create schema for long url
const urlSchema=new mongoose.Schema({
    longUrl:String,
    hashUrl:String
});

// create model using schema
const HashURL=mongoose.model('url_datas', urlSchema);

//api for getting hash url
app.post("/hashing.api.com/v1/url", (req, res)=>{
    const id=getUniqueUrl();
    const longUrl=req.body.longUrl;
    const hashUrl=`hashurl.com/${id}`;
    const obj={
        longUrl,
        hashUrl
    };
    const newURL=new HashURL(obj);
    newURL.save().then((result)=>{
        res.send(result);
    });
});

app.get("/hashurl.com/:id", (req,res)=>{
    const id=req.params.id;
    const url=`hashurl.com/${id}`;
    console.log(url);
    HashURL.findOne({hashUrl:url}).then((record)=>{
        if(!record){
            res.status(404).send("no url available");
        }
        console.log(record)
        res.redirect(record.longUrl);
    });
});

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}!`);
});
