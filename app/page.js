"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const Home = () => {
  const [task, settask] = useState("");
  const [tasks, settasks] = useState([]);
  const [theme, settheme] = useState("black");
  const themeoptions = ["neonstyle", "root", "black", "light"];
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
    await axios.patch(`api/handlestate/${unitask?._id}`);
    await fetchdata();
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className={`w-full p-10 bg-background  ${theme}`}>
      <div className="h-14  m-10 flex justify-end">
        {themeoptions.map((th) => {
          return (
            <button
              key={th}
              className=" w-32 mr-5 text-textcolor p-2 bg-primary rounded-full"
              onClick={() => {
                console.log(th);
                settheme(th);
              }}
            >
              {th}
            </button>
          );
        })}
      </div>
      <form
        className="flex w-full items-center justify-center border-2 border-secondary"
        onSubmit={handlesubmit}
      >
        <input
          name="tasktext"
          placeholder="Enter task here "
          className="bg-primary text-textcolor rounded-l-xl items-center flex h-15 p-2 m-2 w-1/2 "
          value={task}
          onChange={(e) => {
            settask(e.target.value);
          }}
        ></input>
        <button
          className="h-15 bg-primary text-textcolor rounded-r-xl p-3"
          type="submit"
        >
          Add Task
        </button>
      </form>
      <div className="grid grid-cols-2 gap-x-16 px-32">
        {tasks.map((unitask, index) => {
          return (
            <div
              key={index}
              className=" p-2 m-2 bg-primary text-textcolor rounded-xl "
            >
              <div className=" w-full">
                <p
                  className={`h-20 w-full flex items-center overflow-auto ${
                    unitask.state ? "line-through" : ""
                  }`}
                >
                  {unitask?.tasktopic}
                </p>
                <div className=" grid grid-cols-3 gap-x-4 w-full">
                  <Link
                    className="bg-editbutton rounded-full  p-5 m-2   hover:bg-blue-950 focus:outline-1"
                    href={`/editpage?id=${unitask._id}`}
                  >
                    <button className="w-full h-full">edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      handledelete(unitask);
                    }}
                    className="bg-deletebutton rounded-full p-5 m-2 hover:bg-red-950 focus:outline-1 "
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      handlecomplete(unitask);
                    }}
                    className="bg-completebutton rounded-full  p-5 m-2  hover:bg-green-950 focus:outline-1 hover:"
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
