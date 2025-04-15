const dotenv = require('dotenv');
dotenv.config();

//user model to make changes
const userModel = require('./models/user.js');

const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
})

//create
app.post('/create', async (req, res) => {
  //create user from model
  // console.log(req.body);
  let {name, email, image} = req.body;
  const newUser = await userModel.create({
    name,
    email,
    Image: image
  });
  res.redirect("/read")
})

//read
app.get('/read', async (req, res) => {
  let allUsers = await userModel.find();
  res.render("read", {users: allUsers});
})

//update
app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findOne({_id : req.params.id});
    res.render('edit', {user});
})

app.post('/editUser/:id' , async (req,res) => {
  //getting the changed user
  console.log(res.body)
  let {name, email, image} = req.body
  let user = await userModel.findOneAndUpdate({_id : req.params.id} , {
    name,
    email,
    Image : image
  })
  res.render('edit', {user})
})

//delete
app.get('/delete/:id', async(req, res) => {
  //findOneAndRemove
  const deletedUser = await userModel.findOneAndDelete({_id: req.params.id})
  res.redirect("/read");
})

app.listen(8080,(err) => {
  console.log(`Server is listening at port ${process.env.PORT}`);
});