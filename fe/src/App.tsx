import React, { SFC } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";

import StuList from "./pages/teacher/stuList";
import Courses from "./pages/teacher/courses";

import NewCourse from "./pages/student/newCourse";
import CourseList from "./pages/student/courseList";

import AppLayout from "./components/Layout";

interface Props {
  location: { pathname: string };
}

const App: SFC<Props & RouteComponentProps> = props => {
  const isLogin = props.location.pathname === "/login" ? true : false;
  const LoginRouter = <Route path="/login" component={Login}></Route>;

  const AppRouters = (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" push />} />
      <Route path="/app/home" component={Home}></Route>
      <Route path="/teacher/:cno/stulist" component={StuList}></Route>
      <Route path="/teacher/courses" component={Courses}></Route>

      <Route path="/student/course" component={CourseList}></Route>
      <Route path="/student/newcourse" component={NewCourse}></Route>

      <Route path="/login" component={Login}></Route>
    </Switch>
  );
  return isLogin ? LoginRouter : <AppLayout children={AppRouters}></AppLayout>;
};

export default withRouter(App);
