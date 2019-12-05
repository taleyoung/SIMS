import { Counter } from "../../types/store";
import { Action } from "../actions/counter";
import * as actionTypes from "../action-types";

let initState: Counter = {
  number: 0
};
export default function counter(state: Counter = initState, action: Action) {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        number: state.number + 1
      };
    case actionTypes.SUBTRACT:
      return {
        number: state.number - 1
      };

    default:
      return initState;
  }
}
