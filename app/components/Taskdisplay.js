const Taskdisplay = ({ unitask, settasks }) => {
  const handledelete = async () => {
    await axios.delete(`api/taskchange?id=${unitask?._id}`);
    console.log(props.unitask);
  };
  return (
    <div className="p-2 bg-green-900 rounded-xl">
      <div className="flex w-full">
        <p className="w-full flex items-center">{props.unitask?.tasktopic}</p>
        <div className=" flex justify-end w-full">
          <button className="bg-blue-600 rounded-full w-30 p-5 m-2 ">
            edit
          </button>
          <button
            onClick={handledelete}
            className="bg-red-600 rounded-full w-30 p-5 m-2"
          >
            delete
          </button>
          <button className="bg-green-600 rounded-full w-30 p-5 m-2">
            completed
          </button>
        </div>
      </div>
    </div>
  );
};
export default Taskdisplay;
