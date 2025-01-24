"use client";

import {
  assistantAtom,
  fileAtom,
  threadAtom,
  runStateAtom,
  assistantFileAtom,
  runAtom,
} from "@/atom";
import { useAtom } from "jotai";
import React, { useContext } from "react";
import { StateProviderContext } from "../stateProvider";

function Header() {
  const { assistant } = useContext(StateProviderContext)!;
  const [file] = useAtom(fileAtom);
  const [assistantFile] = useAtom(assistantFileAtom);
  const [thread] = useAtom(threadAtom);
  const [run] = useAtom(runAtom);
  const [runState] = useAtom(runStateAtom);

  return (
    <div className="flex flex-row justify-between text-xl font-semibold">
      <div className="flex-1 flex flex-col items-center">
        <span>Assistant:</span>
        <span className="text-blue-500 text-xs">{assistant?.id}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>File:</span>
        <span className="text-blue-500 text-xs">{file}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>Assistant File:</span>
        <span className="text-blue-500 text-xs">{assistantFile}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>Thread:</span>
        <span className="text-blue-500 text-xs">{thread?.id}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>Run:</span>
        <span className="text-blue-500 text-xs">{run?.id}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>Run State:</span>
        <span className="text-blue-500 text-xs">{runState}</span>
      </div>
    </div>
  );
}

export default Header;
