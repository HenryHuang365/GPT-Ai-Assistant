"use client";

import { useContext, useEffect } from "react";
import AssistantRow from "./Assistant";
import AssistantFile from "./AssistantFile";
import Header from "./Header";
import { useAtom } from "jotai";
import {
  fileAtom,
  runStateAtom,
  threadAtom,
  isValidRunState,
  assistantFileAtom,
  runAtom,
} from "@/atom";
import Thread from "./Thread";
import Run from "./Run";
import ChatContainer from "./ChatContainer";
import { StateProviderContext } from "../stateProvider";

export default function MainContent() {
  // Atom State
  // const [, setAssistant] = useAtom(assistantAtom);
  const [, setFile] = useAtom(fileAtom);
  const [, setAssistantFile] = useAtom(assistantFileAtom);
  const [, setThread] = useAtom(threadAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setRunState] = useAtom(runStateAtom);

  const stateProvider = useContext(StateProviderContext);

  // Load default data
  useEffect(() => {
    if (typeof window !== "undefined" && stateProvider) {
      const localAssistant = localStorage.getItem("assistant");
      if (localAssistant) {
        stateProvider.setAssistant(JSON.parse(localAssistant));
      }
      const localFile = localStorage.getItem("file");
      if (localFile) {
        setFile(localFile);
      }
      const localAssistantFile = localStorage.getItem("assistantFile");
      if (localAssistantFile) {
        setAssistantFile(localAssistantFile);
      }
      const localThread = localStorage.getItem("thread");
      if (localThread) {
        setThread(JSON.parse(localThread));
      }
      const localRun = localStorage.getItem("run");
      if (localRun) {
        setRun(JSON.parse(localRun));
      }
      const localRunState = localStorage.getItem("runState");
      if (localRunState && isValidRunState(localRunState)) {
        setRunState(localRunState);
      }
    }
  }, []);

  return (
    <main className="flex flex-col">
      <Header />
      <div className="flex flex-row mt-20 gap-x-10">
        {/* Actions */}
        <div className="flex flex-col w-full">
          <AssistantRow />
          <AssistantFile />
          <Thread />
          <Run />
        </div>
        {/* Chat */}
        <div className="w-full">
          <ChatContainer />
        </div>
      </div>
    </main>
  );
}
