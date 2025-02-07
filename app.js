<<<<<<< Updated upstream
 const express = require("express");
 const path = require("path");
=======
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { register } = require("module");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const app = express();
const port = 3000;

<<<<<<< Updated upstream
=======
const itemSchema = new mongoose.Schema({
    item:String
});

const Item = mongoose.model("itemdata", itemSchema, "itemdata");

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true}
});

const User = mongoose.model("User", userSchema, "users");

<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
 //middleware to serve static data
 app.use(express.static(path.join(__dirname, "public")));

 let message = "Wouldn't you like to be a Pepper to?";

<<<<<<< Updated upstream
 function sendMessage()
 {
     console.log(message);
 }
=======
app.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}// Set to true is using https
}));

function isAuthenticated(req,res, next){
    if(req.session.user)return next();
    return res.redirect("/login");
}

app.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}// Set to true is using https
}));

function isAuthenticated(req,res, next){
    if(req.session.user)return next();
    return res.redirect("/login");
}

app.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}// Set to true is using https
}));

function isAuthenticated(req,res, next){
    if(req.session.user)return next();
    return res.redirect("/login");
}

//MongoDB connection setup
const mongoURI = "mongodb://localhost:27017/Item";
mongoose.connect(mongoURI);
>>>>>>> Stashed changes

// sendMessage();

app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "register.html"));
})

app.post("/register", async (req,res)=>{
    try{
        const {username, password, email} = req.body;

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.send("<p>Username already taken. Try a different one</p><br><a href='/register.html'>Back</a></li>")
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({username, password:hashedPassword, email});
        await newUser.save();

        res.redirect("/login");

    }catch(err){
        res.status(500).send("Error registering new user.");
    }
});

app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "register.html"));
})

app.post("/register", async (req,res)=>{
    try{
        const {username, password, email} = req.body;

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.send("<p>Username already taken. Try a different one</p><br><a href='/register.html'>Back</a></li>")
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({username, password:hashedPassword, email});
        await newUser.save();

        res.redirect("/login");

    }catch(err){
        res.status(500).send("Error registering new user.");
    }
});

app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "register.html"));
})

app.post("/register", async (req,res)=>{
    try{
        const {username, password, email} = req.body;

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.send("<p>Username already taken. Try a different one</p><br><a href='/register.html'>Back</a></li>")
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({username, password:hashedPassword, email});
        await newUser.save();

        res.redirect("/login");

    }catch(err){
        res.status(500).send("Error registering new user.");
    }
});

 //route ex
 app.get("/index",function(request, responce){
     // responce.send("Hello Everyone!");
     responce.sendFile(path.join(__dirname,"public","index.html"));
 });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
 app.get("/addEntry",function(request, responce){
    // responce.send("Hello Everyone!");
    responce.sendFile(path.join(__dirname,"public","addEntry.html"));
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
app.get("/logedIndex",isAuthenticated,(req,res)=>{
    res.sendFile(path.join(__dirname,"public","logedIndex.html"));
});

 app.get("/update/:id", isAuthenticated, async function(request, responce){
    try{
        const itemId = request.params.id;

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
        res.redirect('/logedIndex.html');
    }catch(err){
        console.error("Error updating item:", error);
        res.status(500).send("Server error while updating item");
    }
    
});

app.get("/addEntry", isAuthenticated,(req,res)=>{
    res.redirect("/addEntry.html");
});

app.post("/addEntry", async(req,res)=>{
    try{
        const newItem = new Item(req.body);
        const saveItem = await newItem.save();

        res.redirect("/logedIndex");
        console.log(saveItem);
    }catch(err){
        res.status(501).json({error:"Failed to add new person."});
    }
>>>>>>> Stashed changes
});

app.get("/login",function(request, responce){
    // responce.send("Hello Everyone!");
    responce.sendFile(path.join(__dirname,"public","login.html"));
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
 app.get("/testjson",(req, res)=>{
     res.sendFile(path.join(__dirname,"public","json/games.json"));
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
app.post("/login", async (req,res)=>{
    const {username, password} = req.body;
    console.log(req.body);

    const user = await User.findOne({username});
    
    if(user && bcrypt.compareSync(password, user.password)){
       
        req.session.user = username;
        return res.redirect("/logedIndex");
    }
    req.session.error = "Invalid User";
    return res.redirect("/login")
});

app.get("/logout", (req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login");
    })
});

app.delete("/deleteitem/:id",isAuthenticated, async (req,res)=>{
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
>>>>>>> Stashed changes
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