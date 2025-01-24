"use client";

import { assistantAtom, fileAtom, messagesAtom } from "@/atom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAtom } from "jotai";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { StateProviderContext } from "../stateProvider";

// ######################## Featch Assistant Create ######################## //
async function fetchCreateAssistant() {
  const response = await fetch("/api/assistant/create");
  if (!response.ok) {
    throw new Error("Failed to create assistant");
  }
  return response.json();
}

// ######################## Featch Assistant Modify ######################## //
async function fetchModifyAssistant(assistantId: string, fileId: string) {
  const response = await fetch(
    `/api/assistant/modify?assistantId=${encodeURIComponent(
      assistantId
    )}&fileId=${encodeURIComponent(fileId)}`
  );
  if (!response.ok) {
    throw new Error("Failed to modify assistant");
  }
  return response.json();
}

// ######################## Featch Assistant List ######################## //
async function fetchListAssistants() {
  const response = await fetch(`/api/assistant/list`);
  if (!response.ok) {
    throw new Error("Failed to list assistants");
  }
  return response.json();
}

// ######################## Featch Assistant Delete ######################## //
async function fetchDeleteAssistant(assistantId: string) {
  const response = await fetch(
    `/api/assistant/delete?assistantId=${encodeURIComponent(assistantId)}`
  );
  if (!response.ok) {
    throw new Error("Failed to delete assistant");
  }
}

function AssistantRow() {
  // Atom State / Application store state
  const { assistant, setAssistant } = useContext(StateProviderContext)!;
  const [, setMessages] = useAtom(messagesAtom);
  const [file] = useAtom(fileAtom);

  // State
  const [creating, setCreating] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [listing, setListing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const data = await fetchCreateAssistant();
      const newAssistant = data.assistant;

      console.log("newAssistant", newAssistant);
      setAssistant(newAssistant);
      localStorage.setItem("assistant", JSON.stringify(newAssistant));
      toast.success("Successfully created assistant", {
        position: "bottom-center",
      });
    } catch (error) {
      console.log("error", error);
      toast.error("Error creating assistant", { position: "bottom-center" });
    } finally {
      setCreating(false);
    }
  };

  const handleModify = async () => {
    setModifying(true);
    try {
      const response = await axios.get<{ assistant: Assistant }>(
        `/api/assistant/modify?assistantId=${assistant?.id}&fileId=${file}`
      );

      const newAssistant = response.data.assistant;
      setAssistant(newAssistant);
      localStorage.setItem("assistant", JSON.stringify(newAssistant));
      toast.success("Successfully created assistant", {
        position: "bottom-center",
      });
    } catch (error) {
      console.log("error", error);
      toast.error("Error creating assistant", { position: "bottom-center" });
    } finally {
      setModifying(false);
    }
  };

  const handleList = async () => {
    setListing(true);
    try {
      const response = await axios.get<{ assistants: Assistant[] }>(
        `/api/assistant/list`
      );

      const assistants = response.data.assistants;
      console.log("assistants", assistants);

      toast.success(
        `Assistants:\n${assistants.map((a) => `${a.name + "\n"}`)} `,
        {
          position: "bottom-center",
        }
      );
    } catch (error) {
      console.log("error", error);
      toast.error("Error listing assistants", { position: "bottom-center" });
    } finally {
      setListing(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.get(`/api/assistant/delete?assistantId=${assistant?.id}`);

      setAssistant(null);
      localStorage.removeItem("assistant");
      toast.success("Successfully deleted assistant", {
        position: "bottom-center",
      });
      setMessages([]);
    } catch (error) {
      console.log("error", error);
      toast.error("Error deleting assistant", { position: "bottom-center" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-4xl font-semibold mb-4">Assistant</h1>
      <div className="flex flex-row gap-x-4 w-full">
        <Button onClick={handleCreate}>
          {creating ? "Creating..." : "Create"}
        </Button>
        <Button onClick={handleModify} disabled={!assistant || !file}>
          {modifying ? "Modifying..." : "Modify"}
        </Button>
        <Button onClick={handleList}>{listing ? "Listing..." : "List"}</Button>
        <Button onClick={handleDelete} disabled={!assistant}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}

export default AssistantRow;
