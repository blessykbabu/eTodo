import mongoose from "mongoose";
const schema=mongoose.Schema({
"task":{
    type:String
},
"date":{
    type:String
},
"status":{
    type:Boolean,
    default:false
}

})
export default mongoose.model.Tasks || mongoose.model("Task",schema)