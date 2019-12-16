import React, { SFC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import StuList from "./pages/teacher/stuList";
import Courses from "./pages/teacher/courses";
import NewCourse from "./pages/student/newCourse";
import CourseList from "./pages/student/courseList";

import AppLayout from "./components/Layout";

const App: SFC = () => {
  const Routers = (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
      <Route path="/app/home" component={Home}></Route>
      <Route path="/teacher/:cno/stulist" component={StuList}></Route>
      <Route path="/teacher/courses" component={Courses}></Route>

      <Route path="/student/course" component={CourseList}></Route>
      <Route path="/student/newcourse" component={NewCourse}></Route>
    </Switch>
  );
  return <AppLayout children={Routers}></AppLayout>;
};

export default App;
