"use client";

import { useEffect } from "react";
import AssistantRow from "./components/Assistant";
import AssistantFile from "./components/AssistantFile";
import Header from "./components/Header";
import { useAtom } from "jotai";
import {
  assistantAtom,
  fileAtom,
  runStateAtom,
  threadAtom,
  isValidRunState,
  assistantFileAtom,
  runAtom,
} from "@/atom";
import Thread from "./components/Thread";
import Run from "./components/Run";
import ChatContainer from "./components/ChatContainer";
import MainContent from "./components/MainContent";
import { StateProvider } from "./stateProvider";

export default function Home() {
  return (
    <StateProvider>
      <MainContent />
    </StateProvider>
  );
}
