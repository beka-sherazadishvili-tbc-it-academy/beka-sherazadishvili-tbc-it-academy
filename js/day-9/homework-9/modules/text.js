"use strict";

export function toUpper(text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("please enter string value");
  }

  return text.toUpperCase();
}

export function toLower(text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("please enter string value");
  }

  return text.toLowerCase();
}

export default function reverse(text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("please enter string value");
  }
  
  return text.split("").reverse().join("");
}
