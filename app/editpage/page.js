"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function editpage({ searchParams }) {
  const [data, setdata] = useState("");
  const [temp, settemp] = useState("");
  const useSearchParam = useSearchParams();
  const id = useSearchParam.get("id");
  console.log("id3", id);
  const handleupdate = async (e) => {
    e.preventDefault();
    const update = await axios.put(`/api/taskchange/${id}`, {
      tasktopic: temp,
      desc: "this is desc",
      logo: "this is logoliink",
      state: 0,
    });
  };
  useEffect(() => {
    const fetchdatabyid = async (id) => {
      console.log("id5", id);
      const fetcheddata = await axios.get(
        `http://localhost:3000/api/taskchange/${id}`
      );
      setdata(fetcheddata.data);
      settemp(fetcheddata.data.tasktopic);
    };
    fetchdatabyid(id);
  }, []);

  console.log("data1:", data);
  return (
    <form onSubmit={handleupdate}>
      <input
        value={temp}
        onChange={(e) => {
          settemp(e.target.value);
        }}
      ></input>
      <button type="submit">update</button>
    </form>
  );
}
