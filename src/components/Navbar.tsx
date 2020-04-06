import React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
      <div className="logo">
        <Link to="/">
          <HomeOutlined />
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal">
        {!isAuthenticated && (
          <Menu.Item
            key="login"
            style={{ float: "right" }}
            onClick={() => loginWithRedirect({})}
          >
            Log in
          </Menu.Item>
        )}
        {isAuthenticated && (
          <Menu.Item
            key="logout"
            style={{ float: "right" }}
            onClick={() => logout()}
          >
            Log out
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};

export default Navbar;
