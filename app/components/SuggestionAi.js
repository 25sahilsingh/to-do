"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const SuggestionAi = ({ suggestion }) => {
  return (
    <div className="bg-primary p-2 m-2  rounded-xl text-center">
      <div className=" text-2xl">Suggested Task</div>
      <div>{suggestion}</div>
    </div>
  );
};
export default SuggestionAi;
