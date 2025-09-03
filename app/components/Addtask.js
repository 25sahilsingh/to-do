"use client";

import axios from "axios";
import { useRef, useState } from "react";

const Addtask = ({ handlerefresh }) => {
  const [task, settask] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [time, settime] = useState("");
  const [description, setdescription] = useState("");
  const [istimer, setistimer] = useState(true);
  const timerselector = useRef(true);

  const handlesubmit = async (e) => {
    console.log("inside");
    e.preventDefault();
    await axios.post("/api/taskchange/", {
      tasktopic: task,
      desc: description,
      logo: imagelink,
      state: 0,
      timer: time,
      iscountdown: istimer,
    });
    handlerefresh();
    settask("");
    setimagelink("");
    settime("");
    setdescription("");
    setistimer(true);
  };
  return (
    <form onSubmit={handlesubmit} className="w-full">
      <div className="flex bg-primary rounded-2xl p-2 m-2">
        <p className="m-2 w-28">Task:</p>
        <input
          className="w-full"
          onChange={(e) => {
            settask(e.target.value);
          }}
          value={task}
          placeholder="Enter Task Here"
        ></input>
      </div>
      <div className="flex bg-primary m-2 p-2 rounded-2xl">
        <p className="m-2 w-28">Description:</p>
        <input
          className="w-full"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          value={description}
          placeholder="Enter Desciption"
        ></input>
      </div>
      <div className="flex bg-primary rounded-2xl m-2 p-2">
        <p className="m-2 w-28">Image Link:</p>
        <input
          className="w-1/2"
          onChange={(e) => {
            setimagelink(e.target.value);
          }}
          value={imagelink}
          placeholder="Enter Image"
        ></input>

        <div className="inline-flex rounded-xl border border-gray-300 bg-white">
          <button
            onClick={(e) => {
              e.preventDefault();
              timerselector.current.classList.remove("invisible");
              setistimer(true);
            }}
            className={`px-4 py-2 w-28 rounded-xl transition ${
              istimer
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Timer
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              timerselector.current.classList.add("invisible");

              setistimer(false);
            }}
            className={`px-4 py-2 w-28 rounded-xl transition ${
              !istimer
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Stopwatch
          </button>
        </div>
        <div ref={timerselector} className="flex">
          <p className="m-2 flex justify-center items-center">Timer:</p>
          <input
            onChange={(e) => {
              settime(e.target.value);
            }}
            className="bg-pink-50"
            value={time}
            type="number"
            placeholder="Enter Time "
          ></input>
        </div>
      </div>
      <div className="w-full flex justify-end ">
        <button className="p-4 m-2 bg-deletebutton rounded-2xl" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};
export default Addtask;
