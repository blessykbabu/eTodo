import React, { useState, useEffect } from "react";
import axios from "axios";
import e from "../images/e.png";
import d from "../images/d.png";

export default function Form() {
    const [text, setText] = useState(false);
    const [tid, Setid] = useState("");
    const [newTask, setNew] = useState({ task: "", date: "" });
    const [result, Setresult] = useState([]);
    const [task, SetTask] = useState({ task: "", date: "" });
    const [filterOption, setFilterOption] = useState("All");

    const handleChange = (e) => {
        SetTask((pre) => {
            return { ...pre, [e.target.name]: e.target.value };
        });
    };

    const Change = (e) => {
        setNew((pre) => {
            return { ...pre, [e.target.name]: e.target.value };
        });
    };

    const submit = async () => {
        const res = await axios.post("http://localhost:3000/api/add", task);
        if (res.status === 200) {
            alert("task added");
        }
        get();
    };

    const get = async () => {
        let url = "http://localhost:3000/api/get";
        if (filterOption === "Completed") {
            url += "?completed=true";
        } else if (filterOption === "Has due date") {
            url += "?hasDueDate=true";
        }
        const res = await axios.get(url);
        if (res.status === 200) {
            Setresult(res.data);
        }
    };

    const tedit = async (id) => {
        setText(true);
        Setid(id);
    };

    const edit = async () => {
        const res = await axios.put(
            `http://localhost:3000/api/edit/${tid}`,
            newTask
        );
        if (res.status === 200) {
            alert("updated the task");
            setText(false);
        }
        get();
    };

    const tdelete = async (id) => {
        const res = await axios.delete(
            `http://localhost:3000/api/delete/${id}`
        );
        if (res.status === 200) {
            alert("task deleted");
        }
        get();
    };

    useEffect(() => {
        get();
    }, [filterOption]);

    return (
        <>
            <div className="border-b-[4px] ">
                <div className="my-5 flex justify-center items-center head text-blue-500 text-[40px] font-[bold] underline">
                    <svg
                        className="w-10 rounded-md h-10 me-2 text-white bg-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m5 12 4.7 4.5 9.3-9"
                        />
                    </svg>
                    <h1>My Todo-s</h1>
                </div>
                <div className="w-[90%] px-5 mx-auto border-[2px] py-5 my-5 flex justify-between items-center text-blue-500 ">
                    <input
                        name="task"
                        onChange={handleChange}
                        type="text"
                        className="w-[70%] h-[40px] outline-none"
                        placeholder="Add your task"
                    />
                    <div>
                        <input
                            name="date"
                            onChange={handleChange}
                            className="mx-4"
                            type="date"
                        />
                        <button
                            onClick={submit}
                            className="bg-blue-500 text-white py-2 rounded-xl px-3"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[80%] mx-auto my-10">
                <div className="relative">
                    <div>
                        {text && (
                            <>
                                <div className="flex flex-row border-0 bg-transparent bg-white py-1.5 pl-1 ">
                                    <input
                                        type="text"
                                        name="task"
                                        onChange={Change}
                                        className="w-[70%] h-[40px] outline-none"
                                        placeholder="update your task"
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        className="mx-4"
                                        onChange={Change}
                                    />{" "}
                                    <button
                                        className="bg-blue-500 text-white py-2 rounded-xl px-3"
                                        style={{
                                            color: "white",
                                            padding: 20,
                                            borderRadius: 8,
                                        }}
                                        onClick={edit}
                                    >
                                        Add
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-end my-3" style={{ marginRight: 40 }}>
                        <span className="me-2">Filter</span>
                        <select
                            name="filterOption"
                            value={filterOption}
                            onChange={(e) => setFilterOption(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Has due date">Has due date</option>
                        </select>
                        <span className="me-2 ms-5">Sort</span>
                        <select name="" id="">
                            <option>All</option>
                        </select>
                    </div>
                    {result.map((td) => {
                        return (
                            <div style={{ margin: 40 }}>
                                <div className="flex justify-between" key={td._id} style={{ marginLeft: 20 }}>
                                    <div className="flex gap-4">
                                    <input
                        type="checkbox"
                        checked={td.completed} // Bind checkbox to todo's completed status
                        onChange={() => toggleCompletion(td._id, !td.completed)} // Call toggleCompletion function with todo ID and updated completion status
                    />                                        <h3 className="gap-0.5">{td.task}</h3>
                                    </div>
                                    <div className="flex gap-4 " style={{ marginRight: 40 }}>
                                        <button
                                            onClick={() => {
                                                tedit(td._id);
                                            }}
                                        >
                                            {" "}
                                            <img src={e} width={30} />
                                        </button>
                                        <button
                                            style={{ marginLeft: 10 }}
                                            onClick={() => {
                                                tdelete(td._id);
                                            }}
                                        >
                                            <img src={d} width={30} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-end" style={{ marginRight: 40 }}>
                                    <p>{td.date}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
