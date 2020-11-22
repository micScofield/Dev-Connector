const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Profile = require('../models/Profile')
const User = require('../models/User')

const myProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('User', ['name', 'avatar'])

        if(!profile) {
            return next(new HttpError('No profile found for this user', 404))
        }

    } catch (error) {
        return next(new HttpError('Error while looking for profile', 500))
    }
}

const setProfile = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return next(new HttpError('Invalid Data passed', 422))
        return res.status(422).json({errors: errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubUsername,
        skills,
        youtube,
        facebook,
        twitter,
        linkedIn,
        instagram
    } = req.body

    //set profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubUsername) profileFields.githubUsername = githubUsername
    profileFields.skills = skills.split(',').map(skill => skill.trim())

    //set social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube
    if(twitter) profileFields.social.twitter = twitter
    if(instagram) profileFields.social.instagram = instagram
    if(facebook) profileFields.social.facebook = facebook
    if(linkedIn) profileFields.social.linkedIn = linkedIn

    try {
        let profile = await Profile.findOne({user: req.user.id})

        if(profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            )
            
            res.json({profile: profile})
        }

        //create
        profile = new Profile(profileFields)
        await profile.save()

        return res.json({profile: profile})

    } catch (error) {
        return next(new HttpError('Error while setting up profile'), 500)
    }
}

exports.MyProfile = myProfile
exports.SetProfile = setProfile