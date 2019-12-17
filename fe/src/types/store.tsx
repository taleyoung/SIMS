export interface Store {
  counter: Counter;
  user: User;
}

export interface Counter {
  number: number;
}

export interface User {
  id: number;
  name: string;
  age: number;
  sex: string;
  account: string;
  password: string;
  sdept: string;
}
