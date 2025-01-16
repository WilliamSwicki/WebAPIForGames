 const express = require("express");
 const path = require("path");

const app = express();
const port = 3000;

 //middleware to serve static data
 app.use(express.static(path.join(__dirname, "public")));

 let message = "Wouldn't you like to be a Pepper to?";

 function sendMessage()
 {
     console.log(message);
 }

// sendMessage();

 //route ex
 app.get("/",function(request, responce){
     // responce.send("Hello Everyone!");
     responce.sendFile(path.join(__dirname,"public","app.js"));
 });

 app.get("/testjson",(req, res)=>{
     res.sendFile(path.join(__dirname,"public","json/games.json"));
 });

setTimeout(()=>{
    console.log("Hello 2 seconds later")
},2000);

setTimeout(()=>{
    console.log("Hello now")
},0);


 app.listen(port, function(){
     console.log(`Server is running on port: ${port}`);
 });