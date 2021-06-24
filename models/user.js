const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var roomSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    link: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    }
});


var savedSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    coord: {
        type: Array,
        required: false,
    },
    link: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    }

});


let userSchema = new Schema({
    fullname: {
        type: String,
        unique: false,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    },
    room: [roomSchema],
    saved: [savedSchema]

});


//Delete password form the json response
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}



userSchema.plugin(uniqueValidator, { message: '{PATH} have to be unique' });

module.exports = mongoose.model('User', userSchema);