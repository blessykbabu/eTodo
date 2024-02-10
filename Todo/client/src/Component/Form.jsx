import React, { useState, useEffect } from "react";
import axios from "axios";
import e from "../images/e.png";
import d from "../images/d.png"
export default function Form() {
    const [text, setText] = useState(false)
    const [tid, Setid] = useState('')
    const [newTask, setNew] = useState({
        "task": "",
        "date": ""
    })
    const [result, Setresult] = useState([])
    const [task, SetTask] = useState({
        "task": "",
        "date": ""
    })

    const handleChange = (e) => {
        console.log("reached");
        console.log(e.target.value);
        SetTask((pre) => {
            return { ...pre, [e.target.name]: e.target.value }
        })

    }

    const Change = (e) => {
        console.log("reached");
        console.log(e.target.value);
        setNew((pre) => {
            return { ...pre, [e.target.name]: e.target.value }
        })

    }
    const submit = async () => {
        console.log("values", task);
        const res = await axios.post("http://localhost:3000/api/add", task)
        if (res.status == 200) {
            alert("task added")
        }
        get();
    }

    const get = async () => {
        const res = await axios.get("http://localhost:3000/api/get")
        if (res.status == 200) {
            Setresult(res.data)
            console.log(res.data);
        }
    }
    const tedit = async (id) => {
        setText(true);
        Setid(id)
    }

    const edit = async () => {
        const res = await axios.put(`http://localhost:3000/api/edit/${tid}`, newTask)
        if (res.status == 200) {

            alert("updated the task")
        }
        get();
    }

    const tdelete = async (id) => {
        const res = await axios.delete(`http://localhost:3000/api/delete/${id}`)
        if (res.status == 200) {
            alert("task deleted")
        }
        get();
    }
    useEffect(() => {
        get();
    }, [])
    return (
        <>
            <h1 className="text-xs font-extrabold text-sky-500 text-center text-6xl underline">My Todo-s</h1>

            <div className="flex flex-row border-0 bg-transparent bg-white py-1.5 pl-1 " style={{ marginTop: 10 }}>
                <input type="text" name="task" onChange={handleChange} className="block text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 shadow  " style={{ padding: 20, width: 500 }} placeholder="write your task" />
                <input type="date" name="date" onChange={handleChange} /> <button className="bg-sky-500 hover:bg-sky-700 ..." style={{ color: "white", padding: 20, borderRadius: 8 }} onClick={submit}>Add</button>

            </div>
            <div className="flex flex-row" style={{ position: "relative", left: 300 }}>
                <div className="first" style={{ margin: 10 }}>
                    Filter  <select>
                        <option>All</option>
                        <option>Completed</option>
                        <option>Active</option>
                        <option>Has  due date</option>

                    </select>
                </div>
                <div className="sec" style={{ margin: 10 }}>
                    Sort <select>
                        <option>Added date</option>

                    </select>
                </div>
            </div>

            <div>
                {text && (
                    <>
                        <div className="flex flex-row border-0 bg-transparent bg-white py-1.5 pl-1 ">
                            <input type="text" name="task" onChange={Change} className="block text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 shadow  " style={{ padding: 20, width: 500 }} placeholder="update your task" />
                            <input type="date" name="date" onChange={Change} /> <button className="bg-sky-500 hover:bg-sky-700 ..." style={{ color: "white", padding: 20, borderRadius: 8 }} onClick={edit}>Add</button>
                        </div>
                    </>
                )}


            </div>

            <div>
                {
                    result.map((td) => {
                        return <div style={{ margin: 40 }} key={td._id}>
                            <div className="flex flex-row ">
                                <input type="checkbox"></input>
                                <h3 className="gap-0.5" style={{ margin: 30 }}>{td.task}</h3>

                                <button style={{ margin: 30 }} onClick={() => {
                                    tedit(td._id)
                                }}> <img src={e} width={30} /></button>
                                <button onClick={() => {
                                    tdelete(td._id)
                                }}><img src={d} width={30} /></button>
                            </div>
                            <p>{td.date}</p>
                        </div>

                    })
                }
            </div>
        </>
    )
}