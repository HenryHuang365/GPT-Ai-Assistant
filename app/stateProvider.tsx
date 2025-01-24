"use client";

import React, { createContext, ReactNode, FC, useState } from "react";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import { Messages } from "openai/resources/beta/threads/messages.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";

export type RunState =
  | "queued"
  | "in_progress"
  | "requires_action"
  | "cancelling"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired"
  | "N/A";

interface StateProviderContextType {
  assistant: Assistant | null;
  setAssistant: React.Dispatch<React.SetStateAction<Assistant | null>>;
  file: string | null;
  setFile: React.Dispatch<React.SetStateAction<string | null>>;
  assistantFile: string | null;
  setAssistantFile: React.Dispatch<React.SetStateAction<string | null>>;
  thread: Thread | null;
  setThread: React.Dispatch<React.SetStateAction<Thread | null>>;
  run: Run | null;
  setRun: React.Dispatch<React.SetStateAction<Run | null>>;
  threadMessage: Messages | null;
  setThreadMessage: React.Dispatch<any>;
  runState: RunState;
  setRunState: React.Dispatch<React.SetStateAction<RunState>>;
}

export const StateProviderContext = createContext<
  StateProviderContextType | undefined
>(undefined);

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider: FC<StateProviderProps> = ({ children }) => {
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [assistantFile, setAssistantFile] = useState<string | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const [run, setRun] = useState<Run | null>(null);
  const [threadMessage, setThreadMessage] = useState<Messages | null>(null);
  const [runState, setRunState] = useState<RunState>("N/A");

  const contextValue: StateProviderContextType = {
    assistant: assistant,
    setAssistant: setAssistant,
    file: file,
    setFile: setFile,
    assistantFile: assistantFile,
    setAssistantFile: setAssistantFile,
    thread: thread,
    setThread: setThread,
    run: run,
    setRun: setRun,
    threadMessage: threadMessage,
    setThreadMessage: setThreadMessage,
    runState: runState,
    setRunState: setRunState,
  };

  return (
    <StateProviderContext.Provider value={contextValue}>
      {children}
    </StateProviderContext.Provider>
  );
};
