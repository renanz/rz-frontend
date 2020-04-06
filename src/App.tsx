import React from "react";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.css";
import Routes from "./routes";
import Navbar from "./components/Navbar";
import Breadcrumb from "./components/Breadcrumb";
import moment from "moment";
const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <>
      <Layout className="layout">
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb />
          <Routes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{moment().get("year")} | Created by Renan Zelaya
        </Footer>
      </Layout>
    </>
  );
};

export default App;
