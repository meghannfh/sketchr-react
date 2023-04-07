const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  }
});
 
//Static signup method
UserSchema.statics.signup = async function(username, email, password) {
  
  //validation
  if (!email || !password || !username) {
    throw Error('all fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if(!validator.isStrongPassword(password)) {
    throw Error('Password is too weak')
  }

  //we don't have access to the User model so we can invoke this to refer
  //to the UserSchema and using this required a regular function and not 
  //an arrow function
  const emailExists = await this.findOne({ email })
  const usernameExists = await this.findOne({ username })
  if(emailExists) {
    throw Error('Email already in use')
  }

  if(usernameExists) {
    throw Error('Username is already in use')
  }

  //we use await because this step takes time to complete
  //the argument is the number of rounds default val is 10
  const salt = await bcrypt.genSalt(10)

  //this allows bcrypt to hash the password
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, email, password: hash })
  console.log(`this is the user sent to the db after hashing pw`, user)

  return user
}

//static login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Missing email or password')
  }

  const user = await this.findOne({ email })

  if(!user) {
    throw Error('Incorrect email or user with that email does not exist')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', UserSchema)