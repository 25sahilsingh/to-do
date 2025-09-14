"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function EditPageContent() {
  const [data, setdata] = useState("");
  const [temp, settemp] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleupdate = async (e) => {
    e.preventDefault();
    await axios.put(`/api/taskchange/${id}`, {
      tasktopic: temp,
      desc: "this is desc",
      logo: "this is logolink",
      state: 0,
    });
  };

  useEffect(() => {
    const fetchdatabyid = async (id) => {
      const fetcheddata = await axios.get(`/api/taskchange/${id}`);
      setdata(fetcheddata.data);
      settemp(fetcheddata.data.tasktopic);
    };
    if (id) fetchdatabyid(id);
  }, [id]);

  return (
    <form onSubmit={handleupdate}>
      <input value={temp} onChange={(e) => settemp(e.target.value)} />
      <button type="submit">update</button>
    </form>
  );
}

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPageContent />
    </Suspense>
  );
}
