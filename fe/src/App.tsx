import React, { SFC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import StuList from "./pages/teacher/stuList";
import CourseList from "./pages/student/courseList";

import AppLayout from "./components/Layout";

const App: SFC = () => {
  const Routers = (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
      <Route path="/app/home" component={Home}></Route>
      <Route path="/teacher/stulist" component={StuList}></Route>
      <Route path="/student/course" component={CourseList}></Route>
    </Switch>
  );
  return <AppLayout children={Routers}></AppLayout>;
};

export default App;
