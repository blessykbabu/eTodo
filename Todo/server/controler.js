// import schema from "../server/model.js";
//  export async function add(req,res){
//     let{task,date}=req.body;
//     const result=await schema.create({task,date});
//     res.status(200).send("data added")
//  }
//  export async function get(req,res){
//     const result=await schema.find();
//     res.status(200).send(result)
//  }

//  export async function deleteTodo(req,res){
//     let{id}=req.params;
//     const result=await schema.deleteOne({_id:id});
//     res.status(200).send("deletd")
//  }

//  export async function updateTodo(req,res){
//     let{id}=req.params;
//     let{task,date}=req.body;
//     const result=await schema.updateOne({_id:id},{$set:{task,date}});
//     res.status(200).send(result)
//  }


import schema from "../server/model.js";

export async function add(req, res) {
    let { task, date } = req.body;
    const result = await schema.create({ task, date });
    res.status(200).send("data added");
}

export async function get(req, res) {
    try {
        let query = {};

        if (req.query.completed === 'true') {
            query.completed = true;
        } else if (req.query.hasDueDate === 'true') {
            query.date = { $exists: true, $ne: null };
        }

        const result = await schema.find(query);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteTodo(req, res) {
    let { id } = req.params;
    const result = await schema.deleteOne({ _id: id });
    res.status(200).send("deleted");
}

export async function updateTodo(req, res) {
    let { id } = req.params;
    let { task, date } = req.body;
    const result = await schema.updateOne({ _id: id }, { $set: { task, date } });
    res.status(200).send(result);
}
