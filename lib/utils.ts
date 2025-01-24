import { RunState } from "@/app/stateProvider";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidRunState = (
  value: RunState | string
): value is RunState => {
  const validStates: RunState[] = [
    "queued",
    "in_progress",
    "requires_action",
    "cancelling",
    "cancelled",
    "failed",
    "completed",
    "expired",
    "N/A",
  ];

  return validStates.includes(value as RunState);
};
