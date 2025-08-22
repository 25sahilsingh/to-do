"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const Home = () => {
  const [task, settask] = useState("");
  const [tasks, settasks] = useState([]);
  const handlesubmit = async (e) => {
    e.preventDefault();
    await postdata(task);

    await fetchdata();
    settask("");
  };
  const fetchdata = async () => {
    try {
      const fetcheddata = await axios.get("api/taskchange");
      settasks(fetcheddata.data);
    } catch (error) {
      console.log("error:", error);
    }
  };
  const postdata = async (a) => {
    try {
      const posttasks = await axios.post("/api/taskchange/", {
        tasktopic: a,
        desc: "this is desc",
        logo: "this is logoliink",
        state: 0,
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handledelete = async (unitask) => {
    await axios.delete(`api/taskchange?id=${unitask?._id}`);

    await fetchdata();
  };
  const handlecomplete = async (unitask) => {
    //await axios.put(`api/handlestate?id=${unitask?._id}`);
    console.log("this is temporary");
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="w-screen p-10">
      <form
        className="flex w-screen items-center justify-center"
        onSubmit={handlesubmit}
      >
        <input
          name="tasktext"
          placeholder="Enter task here "
          className="bg-purple-800 rounded-full items-center flex h-10 p-2 m-10"
          value={task}
          onChange={(e) => {
            settask(e.target.value);
          }}
        ></input>
        <button type="submit">Add Task</button>
      </form>
      <div className="grid grid-cols-2 ">
        {tasks.map((unitask, index) => {
          return (
            <div key={index} className=" p-2 m-2 bg-green-900 rounded-xl ">
              <div className="flex w-full">
                <p className="h-20 w-full flex items-center truncate ">
                  {unitask?.tasktopic}
                </p>
                <div className=" flex justify-end w-full">
                  <Link href={`/editpage?id=${unitask._id}`}>
                    <button className="bg-blue-600 rounded-full w-30 p-5 m-2   hover:bg-blue-800 focus:outline-1">
                      edit
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handledelete(unitask);
                    }}
                    className="bg-red-600 rounded-full w-30 p-5 m-2 hover:bg-red-800 focus:outline-1 "
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      handlecomplete(unitask);
                    }}
                    className="bg-green-600 rounded-full w-30 p-5 m-2  hover:bg-green-800 focus:outline-1 hover:"
                  >
                    completed
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
