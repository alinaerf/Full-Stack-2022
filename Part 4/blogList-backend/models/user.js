const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String, 
        minlength:3,
        required:true
    },
    name:String,
    passwordHash:{
        type:String, 
        minlength:3,
        required:true
    },
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform:(document, returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports=mongoose.model('User', userSchema)