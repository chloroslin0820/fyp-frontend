import {createContext} from "react";
import {FirebaseUserData} from "../data/user/FirebaseUserData.ts";

export const LoginUserContext= createContext<FirebaseUserData | null | undefined>(undefined)