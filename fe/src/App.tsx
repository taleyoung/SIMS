import React, { SFC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";

import AppLayout from "./components/Layout";

const App: SFC = () => {
  const Routers = (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
      <Route path="/app/home" component={Home}></Route>
    </Switch>
  );
  return <AppLayout children={Routers}></AppLayout>;
};

export default App;
