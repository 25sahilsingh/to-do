"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Addtask from "./components/Addtask";
const Home = () => {
  const [Search, setSearch] = useState("");
  const [tasks, settasks] = useState([]);
  const [theme, settheme] = useState("light");
  const themeoptions = ["neonstyle", "root", "black", "light"];
  const tempobj = useRef({});
  const [addtaskvisible, setaddtaskvisible] = useState(false);
  const handlestartstop = async (unitask) => {
    if (!Object.keys(tempobj.current).includes(unitask._id)) {
      tempobj.current[unitask._id] = setInterval(() => {
        settasks((prev) => {
          var updated = [];
          prev.map((t) => {
            updated = [
              ...updated,
              t._id === unitask._id ? { ...t, timer: t.timer - 1 } : t,
            ];
          });
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(tempobj.current[unitask._id]);
      delete tempobj.current[unitask._id];

      const data = await axios.patch(
        `/api/handletimer/${unitask._id}`,
        unitask.timer
      );
    }
  };
  const handlerefresh = async () => {
    await fetchdata();
  };
  const fetchdata = async () => {
    try {
      const fetcheddata = await axios.get(`api/taskchange/?Search=${Search}`);
      settasks(fetcheddata.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handledelete = async (unitask) => {
    await axios.delete(`api/taskchange?id=${unitask?._id}`);
    await fetchdata();
  };
  const handlesearch = async (e) => {
    e.preventDefault();
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
    <div className={`min-h-screen p-10 bg-background ${theme}`}>
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
      <div className="p-10">
        <div className="flex flex-col justify-center items-center w-2/3 mx-auto">
          <form
            className="flex w-full items-center justify-center mb-10 "
            onSubmit={handlesearch}
          >
            <input
              name="searchtext"
              placeholder="Enter what to search here "
              className="bg-primary text-textcolor rounded-l-xl items-center flex h-15 p-2 m-2 w-full "
              value={Search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <button
              className="h-15 bg-primary text-textcolor rounded-r-xl p-3"
              type="submit"
            >
              Search
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setaddtaskvisible((prev) => !prev);
              }}
              className="ml-10 h-15 bg-primary text-textcolor rounded-xl p-3"
            >
              Add Task
            </button>
          </form>

          {addtaskvisible && <Addtask handlerefresh={handlerefresh} />}
        </div>
        <div className="grid grid-cols-2 gap-x-16 px-32">
          {tasks.map((unitask, index) => {
            const hrs = Math.floor(unitask.timer / 3600);
            const min = Math.floor((unitask.timer % 3600) / 60);
            const sec = unitask.timer % 60;

            const hh = String(hrs).padStart(2, "0");
            const mm = String(min).padStart(2, "0");
            const ss = String(sec).padStart(2, "0");
            const formattedtime = `${hh}:${mm}:${ss}`;
            return (
              <div key={index} className=" m-2">
                <div className=" p-2 bg-primary text-textcolor rounded-t-xl  hover:scale-110 hover:bg-primary-hover ">
                  <div className=" w-full">
                    <p
                      className={`p-2 h-20 w-full  overflow-auto text-2xl ${
                        unitask.state ? "line-through" : ""
                      }`}
                    >
                      {unitask?.tasktopic}
                    </p>
                    <p>{unitask.desc}</p>
                    <div className=" grid grid-cols-3 gap-x-4 w-full">
                      <Link
                        className="bg-editbutton rounded-full  p-5 m-2   hover:bg-editbutton-hover focus:outline-1 shadow-md shadow-secondary"
                        href={`/editpage?id=${unitask._id}`}
                      >
                        <button className="w-full h-full">edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          handledelete(unitask);
                        }}
                        className="bg-deletebutton rounded-full p-5 m-2 hover:bg-deletebutton-hover focus:outline-1 shadow-md shadow-secondary"
                      >
                        delete
                      </button>
                      <button
                        onClick={() => {
                          handlecomplete(unitask);
                        }}
                        className="bg-completebutton rounded-full  p-5 m-2  hover:bg-completebutton-hover focus:outline-1 shadow-md shadow-secondary"
                      >
                        completed
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex w-full rounded-b-xl bg-primary p-2 text-xl items-center ">
                  <div className="flex text-secondary">
                    <div>{`${hh}:`}</div>
                    <div>{`${mm}:`}</div>
                    <div>{`${ss}`}</div>
                  </div>
                  <div className=" w-full justify-end flex">
                    <button
                      className="p-2 bg-deletebutton hover:bg-deletebutton-hover rounded-2xl" //make color name change
                      onClick={() => {
                        handlestartstop(unitask);
                      }}
                    >
                      start/stop
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;
