const mongoose = require ('mongoose')
const {Schema} = require('mongoose');


const userSchema = new Schema({
    FirstName : {type:'string',required:[true,'FirstName is a requires feild']},
    LastName : {type:'string',required:[true,'LastName is a requires feild']},
    Email : {type :'string',required:[true,'Email is a required feild'],unique:true},
    PhoneNumber : {type:'number',required:[true,'Phonenumber is a required feild']},
    Password : {type:'string',required : [true,'Password is a required feild']},
    JwtToken : String,
    Address : String,
    ProfilePic : String
},
{
    timestamps: true
})

module.exports = mongoose.model('user',userSchema)