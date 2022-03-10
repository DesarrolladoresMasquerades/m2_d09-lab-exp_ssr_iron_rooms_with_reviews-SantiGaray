const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Room = require("../models/Room.model");


// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { route } = require("./auth");

//------------------------SHOW DTAILS-----------------------------
router.route("/:id/details")
.get((req, res)=> {
    
    Room.findById(req.params.id)
    .populate("owner")
    .then((room)=>{
        let roomOwner = false;
        if(req.session.user && room.owner._id == req.session.user._id){
            roomOwner = true;
            res.render("rooms/room-details", {room, roomOwner})
        }
        res.render("rooms/room-details", room)
    })
})

//--------------------CREATE ROOM-----------------------

router.route("/create-room", isLoggedIn)
.get((req, res) => {
    res.render("rooms/create-room")
})
.post((req,res)=>{
    const {name, description, imageUrl } = req.body;
    const ownerId = req.session.user._id
    
    Room.create({name, description, imageUrl, owner: ownerId })
    .then(res.redirect('/list-room'))
    .catch(err=> console.log(`There was an error creating a room: ${err}`))
})

//------------------------DISPLAY ROOMS----------------------

router.route("/")
.get((req, res) => {
    Room.find()
    .then((rooms)=> res.render("rooms/list-room", {rooms}))
    .catch(err=> console.log(`There was an error showing the rooms: ${err}`))
})

module.exports = router;