const User = require("../models/User");
const jwt = require('jsonwebtoken');


//create a function that we can reuse to generate
//token for us in the login and signup controller
const createToken = (_id, ) => {
  //take _id from mongo and it needs to be passed in because it is part of the payload that is necessary for the server to generate a unique key

  /*CREATING THE TOKEN */
  /* takes 3 arguments: first is an object which represents the payload on the token that we want to create. We want the id property. 2nd argument is the secret that's only known to the server. This should be hidden in the .env file. It can be anything.then last one are options. in this case we make the token expire in 3 days*/
  return jwt.sign(
    {_id, }, 
    process.env.SECRET, 
    { expiresIn: '3d' }
    )

}

module.exports = {
  //login user
  postLogin: async (req, res, next) => {
    /*grab the email and password from the request coming in from the
    login form */
    const { email, password } = req.body

    try{

      const user = await User.login(email, password)

      //create token
      const token = createToken(user._id)

      res.status(200).json({email, token})

    } catch(error) {

      res.status(400).json({error: error.message})
    }
  },

  //signup user
  postSignup: async (req, res, next) => {
    const { email, username, password } = req.body
    console.log(req.body)

    try {
      const user = await User.signup(username, email, password)
      console.log(`this is the user data returned in the controller`, user)

      //create a token using the function we created
      const token = createToken(user._id) //need the id of the user

      res.status(200).json({ username, email, token })
    } catch(error) {
      res.status(400).json({ error: error.message })
      console.log(error)
    }
  },
}


// exports.editProfile = async (req, res) => {
//   let fileErrors = req.flash('errors')
//       try{
//         const result = await cloudinary.uploader.upload(req.file.path)
//         console.log(req.body)
//         console.log(result)
//           let update = await User.findOneAndUpdate(
//               { _id: req.user.id },
//               { 
//                 profileImage: result.secure_url,
//                 profileCloudinaryId: result.public_id,
//                }
//             );
//           console.log('Profile updated')
//           res.redirect(`/profile`)
//       }catch(err){
//         if (req.fileValidationError) {
//           req.flash("errors", {
//             msg: "please enter a jpg, jpeg or png file type",
//           });
//           return res.redirect("../profile");
//         } else if (!req.file) {
//           req.flash("errors", {
//             msg: "please retry with a file selected",
//           });
//           return res.redirect("../profile");
//       }
//     }
//   }

// exports.deletePic = async (req, res) => {
//   try{
//     let user = await User.findById({ _id: req.params.id })
//     await cloudinary.uploader.destroy(user.profileCloudinaryId)
//     await User.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           profileImage: '',
//           profileCloudinaryId: '',
//         }
//       );
//     console.log('profile pic deleted')
//     res.redirect('/profile')
//   }catch(err){
//     console.log(err)
//     res.redirect('/profile')
//   }
// }