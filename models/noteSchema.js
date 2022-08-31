import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title:String,
    task:{
        type:String,
        required:true
    },
    creator:String
});

export default mongoose.model("note",noteSchema);