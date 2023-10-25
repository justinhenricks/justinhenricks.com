import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function missingClass(string?: string, prefix?: string) {
  if (!string) {
    return true;
  }

  const regex = new RegExp(` ?${prefix}`, "g");
  return string.match(regex) === null;
}
