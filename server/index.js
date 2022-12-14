const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const posts = require('./routes/api/posts');
const dotenv= require('dotenv').config();


const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/posts', posts);

// Handle production
if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle Single page application (SPA)
    app.get(/.*/, (req,res)=>{
        res.sendFile(__dirname + '/public/index.html');
    });
}

const port = process.env.PORT || process.env.LOCAL_PORT;

app.listen(port, ()=>{
    `Server started on ${port}`;
});