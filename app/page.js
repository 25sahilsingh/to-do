"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Addtask from "./components/Addtask";
import Image from "next/image";

const Home = () => {
  const [Search, setSearch] = useState("");
  const [tasks, settasks] = useState([]);
  const [theme, settheme] = useState("light");
  const [selectedtaskid, setselectedtaskid] = useState([]);
  const themeoptions = ["neonstyle", "root", "black", "light"];
  const timerrunningobject = useRef({});
  const alarmelement = useRef();
  const [addtaskvisible, setaddtaskvisible] = useState(false);

  const handlestartstop = async (unitask) => {
    if (unitask.timer == 0) {
      handlecomplete(unitask);
    }
    if (!Object.keys(timerrunningobject.current).includes(unitask._id)) {
      timerrunningobject.current[unitask._id] = setInterval(() => {
        settasks((prev) => {
          var updated = [];
          prev.map((t) => {
            let updateddata;
            if (t._id === unitask._id) {
              if (unitask.iscountdown) {
                if (t.timer > 0) {
                  updateddata = { ...t, timer: t.timer - 1 };
                } else {
                  updateddata = t;
                  alarmelement.current.play();
                }
              } else {
                updateddata = { ...t, timer: t.timer + 1 };
              }
            } else {
              updateddata = t;
            }
            updated = [...updated, updateddata];
          });
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(timerrunningobject.current[unitask._id]);
      delete timerrunningobject.current[unitask._id];
      const data = await axios.patch(`/api/handletimer/${unitask._id}`, {
        data: unitask.timer,
      });
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

  const handledelete = async () => {
    await axios.delete(`api/taskchange/${JSON.stringify(selectedtaskid)}`);
    await fetchdata();
  };

  const handlesearch = async (e) => {
    e.preventDefault();
    await fetchdata();
  };

  const handlecomplete = async () => {
    await axios.patch(`api/handlestate/${JSON.stringify(selectedtaskid)}`);
    await fetchdata();
    setselectedtaskid([]);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className={`min-h-screen p-10 bg-background ${theme}`}>
      <audio
        ref={alarmelement}
        id="alarm-sound"
        src="/beepcontinous.wav"
        preload="auto"
      ></audio>
      <div className="h-14  m-2 flex justify-end">
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
        <div className="flex justify-end w-full px-32 h-20">
          <button
            onClick={handledelete}
            className="rounded-3xl w-36 p-2 m-2 bg-deletebutton hover:bg-deletebutton-hover"
          >
            DELETE
          </button>
          <button
            onClick={handlecomplete}
            className="rounded-3xl w-36 p-2 m-2 bg-completebutton hover:bg-completebutton-hover"
          >
            COMPLETE
          </button>
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
              <div key={index} className="m-2 h-72">
                <input
                  className="peer hidden"
                  id={`selectCheckbox-${unitask._id}`}
                  type="checkbox"
                  checked={selectedtaskid.includes(unitask._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setselectedtaskid((prev) => [...prev, unitask._id]);
                    } else {
                      setselectedtaskid((prev) =>
                        prev.filter((t) => t !== unitask._id)
                      );
                    }
                    console.log(selectedtaskid);
                  }}
                />
                <label
                  htmlFor={`selectCheckbox-${unitask._id}`}
                  className="block h-full  rounded-2xl overflow-hidden peer-checked:outline-blue-600 peer-checked:outline-4"
                >
                  <div className="p-2 bg-primary text-textcolor hover:scale-102 hover:bg-primary-hover h-3/4">
                    <div className="flex h-1/4 items-center">
                      <div className="flex h-full items-center">
                        <Image
                          className="rounded-full w-11 h-11"
                          src={`${
                            unitask.logo ||
                            "https://res.cloudinary.com/da92n7ws2/image/upload/v1757495582/561f0033-67a2-41df-96f8-440788337e65_jogjtj.jpg"
                          }`}
                          alt="logo"
                          width={50}
                          height={50}
                        />
                      </div>
                      <p
                        className={`flex items-center p-2 w-full overflow-hidden text-2xl ${
                          unitask.state ? "line-through" : ""
                        }`}
                      >
                        {unitask?.tasktopic}
                      </p>
                    </div>
                    <p
                      className={`whitespace-pre-line h-3/4 overflow-auto ${
                        unitask.state ? "line-through" : ""
                      }`}
                    >
                      {unitask.desc}
                    </p>
                  </div>
                  <div className="mt-1 h-1/4 flex w-full bg-primary p-2 text-xl items-center">
                    <div className="flex text-secondary">
                      <div>{`${hh}:`}</div>
                      <div>{`${mm}:`}</div>
                      <div>{`${ss}`}</div>
                    </div>
                    <div className="w-full justify-end flex">
                      <button
                        className="p-2 bg-deletebutton hover:bg-deletebutton-hover rounded-2xl"
                        onClick={() => {
                          handlestartstop(unitask);
                        }}
                      >
                        start/stop
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
