import * as actionTypes from "../action-types";

export interface Add {
  type: typeof actionTypes.ADD;
}
export interface Subtract {
  type: typeof actionTypes.SUBTRACT;
}

type Action = Add | Subtract;

const add = () => {
  return {
    type: actionTypes.ADD
  };
};
const subtract = () => {
  return {
    type: actionTypes.SUBTRACT
  };
};

export { add, subtract, Action };
