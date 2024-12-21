import { atom } from "jotai";
import { getUser } from "./users-token-handlers";

export const userAtom = atom(getUser());
