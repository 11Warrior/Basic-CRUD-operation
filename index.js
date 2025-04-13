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



//delete
app.get('/delete/:id', async(req, res) => {
  //findOneAndRemove
  const deletedUser = await userModel.findOneAndDelete({_id: req.params.id})
  res.redirect("/read");
})

app.listen(8080,(err) => {
  console.log(`Server is listening at port ${process.env.PORT}`);
});