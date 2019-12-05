import React, { SFC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/header";
import Home from "./pages/home";
import Article from "./pages/article";
import About from "./pages/about";

const { Content, Footer } = Layout;

const App: SFC = () => {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/app/home" push />}
          />
          <Route path="/app/home" component={Home}></Route>
          <Route path="/app/article" component={Article}></Route>
          <Route path="/app/about" component={About}></Route>
        </Switch>
      </Content>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default App;
