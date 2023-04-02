const validator = require("validator");
const User = require("../models/User");

module.exports = {
  getLogin: async (req, res) => {
    
  },
  //login user
  postLogin: async (req, res, next) => {
    res.json({msg: 'login user'});
  },
  //logout
  getLogout: async (req, res, next) => {
   
  },
  //get signup
  getSignup: async (req, res, next) => {
    
  },
  //signup user
  postSignup: async (req, res, next) => {
    const { email, username, password } = req.body

    try {
      const user = await User.signup(email, username, password)

      res.status(200).json({ email, user})
    } catch(error) {

      res.status(400).json({ error: error.message })
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