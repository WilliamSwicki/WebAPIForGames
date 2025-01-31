const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;

const itemSchema = new mongoose.Schema({
    item:String
});

const Item = mongoose.model("itemdata", itemSchema, "itemdata");

 //middleware to serve static data
 app.use(express.urlencoded({extended:true}));
 app.use(express.static(path.join(__dirname, "public")));

//Set up middleware to parse json requests
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

//MongoDB connection setup
const mongoURI = "mongodb://localhost:27017/Item";
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", ()=>{
    console.log("Connected to MongoDB Database");
});

 //route ex
 app.get("/index",function(request, responce){
     responce.sendFile(path.join(__dirname,"public","index.html"));
 });

 app.get("/update/:id", async function(request, responce){
    try{
        const itemId = request.params.id;
        
        //const item = await Item.findById(itemID);
        
        // if(!item)
        // {
        //     return responce.status(404).json({error:"Item not found"});
        // }

        const filePath = path.join(__dirname, 'public', 'update.html');
        console.log(filePath);
        responce.sendFile(filePath,{
            headers:{
                'Cache-Control':'no-store'
            }
        });
    } catch(err){
        responce.status(500).json({error:"server error"});
    }
});

app.post("/updateItem/:id", async (req, res)=>{
    const itemId = req.params.id;
    const updatedItem = req.body.item; 

    try{
        const newItem = await Item.findByIdAndUpdate(itemId,{item:updatedItem},{new: true});
        if (!newItem) {
            return res.status(404).send("Item not found"); 
        }
        res.redirect('/index.html');
    }catch(err){
        console.error("Error updating item:", error);
        res.status(500).send("Server error while updating item");
    }
    
});

app.post("/addEntry",async(req,res)=>{
    try{
        const newItem = new Item(req.body);
        const saveItem = await newItem.save();

        res.redirect("/index");
        console.log(saveItem);
    }catch(err){
        res.status(501).json({error:"Failed to add new person."});
    }
});

app.get("/login",function(request, responce){
    responce.sendFile(path.join(__dirname,"public","login.html"));
});

app.delete("/deleteitem/:id", async (req,res)=>{
    try{
        const item = await Item.findById(req.params.id);
        
        console.log(item);
        if(item.length==0){
            return res.status(404).json({error:"Failed to find the person."});
        }
        const deletedItem = await Item.findByIdAndDelete(item);
        
        res.sendFile(path.join(__dirname,"public","index.html"));
    }catch(err){
        res.status(404).json({error:"item not found"});
    }
});

 app.get("/testjson", async (req, res)=>{
    try{
        const items = await Item.find();
        res.json(items);
        console.log(items);
    }catch(err){
        res.status(500).json({error:"Failed to get items"});
    }
    //  res.sendFile(path.join(__dirname,"public","json/games.json"));
 });

 app.get("/testjson/:id", async (req, res)=>{
    try{
        const items = await Item.findById(req.params.id);
        res.json(items);
    }catch(err){
        res.status(500).json({error:"Failed to get items"});
    }
    //  res.sendFile(path.join(__dirname,"public","json/games.json"));
 });

 app.listen(port, function(){
     console.log(`Server is running on port: ${port}`);
 });