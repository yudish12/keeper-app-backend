import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});


const user = mongoose.model("keeperuser",userSchema);
export {user};