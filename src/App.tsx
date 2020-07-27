import React from "react";
import { Router } from "react-router-dom";
import Container from "react-bootstrap/Container";
import moment from "moment";
import "./App.css";
import Routes from "./routes";
import CustomNavbar from "./components/Navbar";
import history from "./history";

const App = () => {
  return (
    <>
      <header>
        <CustomNavbar />
      </header>
      <Container>
        <Router history={history}>
          <Routes />
        </Router>
      </Container>
      <footer style={{ textAlign: "center" }}>
        ©{moment().get("year")} | Created by Renan Zelaya
      </footer>
    </>
  );
};

export default App;
