const express = require('express')
const router = express.Router()

router.put('/edit/:id', upload.single('profileImage'), authController.editProfile)
router.put("/delete/:id", authController.deletePic)

module.exports = router;