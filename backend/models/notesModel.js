const express = require("express");
const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupColor: {
        type: String,
        required: true
    },
    shortForm:{
        type:String,
        required:true
    },
    notes: [{
        id:{
            type:Number,
            required:true
        },
        text:{
            type:String,
        },
        date:{
            type:String,
        },
        time:{
            type:String
        }
    }]
    },{timestamps: true});

    module.exports = mongoose.model("Notes", notesSchema);