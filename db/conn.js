import mongoose from "mongoose";
const connect = ()=>{
    mongoose.connect("mongodb+srv://yudish_12:test123@cluster0.rpgyo.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
        console.log('db connected');
    }).catch((e)=>{
        console.log(e);
    })
}
export default connect;
