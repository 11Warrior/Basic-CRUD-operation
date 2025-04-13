const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 
//we can do this in .env file for security purpose


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log('Connected to MongoDB')
)


const userSchema = mongoose.Schema({
  name: String,
  email: String,
  Image: String
})

module.exports = mongoose.model('user', userSchema);