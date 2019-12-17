import { AnyAction } from "redux";

import { User } from "../../types/store";
import { LOGIN } from "../action-types";

const initState: User = {
  id: 0,
  name: "string",
  age: 0,
  sex: "",
  account: "",
  password: "",
  sdept: ""
};

export default function user(state: User = initState, action: AnyAction) {
  switch (action.type) {
    case LOGIN:
      console.log("jinle", { ...state, ...action.payload });
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
