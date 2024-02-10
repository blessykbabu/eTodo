import schema from "../server/model.js";
 export async function add(req,res){
    let{task,date}=req.body;
    const result=await schema.create({task,date});
    res.status(200).send("data added")
 }
 export async function get(req,res){
    const result=await schema.find();
    res.status(200).send(result)
 }

 export async function deleteTodo(req,res){
    let{id}=req.params;
    const result=await schema.deleteOne({_id:id});
    res.status(200).send("deletd")
 }

 export async function updateTodo(req,res){
    let{id}=req.params;
    let{task,date}=req.body;
    const result=await schema.updateOne({_id:id},{$set:{task,date}});
    res.status(200).send(result)
 }