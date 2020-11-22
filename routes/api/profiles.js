const express = require('express')
const { check } = require('express-validator')

const auth = require('../../middlewares/auth')

//controller
const ProfileController = require('../../controllers/profiles')

const router = express.Router()

//get current user profile  @access=private
router.get('/me', auth, ProfileController.MyProfile)

//post/create or update user profile @access=private
router.post(
    '/', 
    [
        auth, 
        [
            check('status', 'Status is required').notEmpty(),
            check('skills', 'Skills field is required').notEmpty()
        ]
    ], 
    ProfileController.SetProfile)

module.exports = router