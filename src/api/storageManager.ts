import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { create } from "zustand";
import { WHITELIST_KEYS } from "../constants/storageKeys";

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    localStorage.setItem(name, value);
  },
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return Promise.resolve(value ?? null);
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const clearUserStorage = () => {
  Object.keys(localStorage).forEach((key) => {
    if (!WHITELIST_KEYS.has(key)) {
      localStorage.removeItem(key);
    }
  });
};

export const clearStorage = () => {
  localStorage.clear();
};

export { create, zustandStorage, persist, createJSONStorage };
