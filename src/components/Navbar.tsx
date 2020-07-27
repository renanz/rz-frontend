import React, { useMemo } from "react";
import { useAuth0 } from "../services/AuthService/react-auth0-spa";
import { Nav, Navbar as BNavbar, NavDropdown } from "react-bootstrap";
import { isEmpty } from "ramda";

interface NavbarItems extends NavbarItem {
  items?: NavbarItems[];
}

interface NavbarItem {
  id: string;
  title: string;
  link?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  display: (isAuthenticated?: boolean) => boolean | boolean;
}

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navbarItems: NavbarItems[] = useMemo(
    () => [
      {
        link: "/todo",
        id: "todo",
        title: "To Do",
        items: [
          {
            id: "todo:list",
            link: "/todo",
            title: "All To dos",
            display: () => true,
          },
          {
            id: "todo:create",
            link: "/todo/create",
            title: "Create To do",
            display: () => true,
          },
        ],
        display: () => true,
      },
      {
        link: "/profile",
        id: "profile",
        title: "Profile",
        display: () => isAuthenticated,
      },
    ],
    [isAuthenticated]
  );
  return (
    <BNavbar bg="dark" variant="dark" expand="lg">
      <BNavbar.Brand href="/">My Page</BNavbar.Brand>
      <BNavbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto">
        {navbarItems.map(
          (item) =>
            item.display() &&
            (isEmpty(item.items || []) ? (
              <Nav.Link key={item.id} href={item.link} style={item.style}>
                {item.title}
              </Nav.Link>
            ) : (
              <NavDropdown key={item.id} id={item.id} title={item.title}>
                {item.items?.map((item) => (
                  <NavDropdown.Item key={item.id} href={item.link}>
                    {item.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))
        )}
      </Nav>
      <Nav>
        {isAuthenticated ? (
          <NavDropdown
            title={user?.nickname || ""}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                logout();
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link onClick={loginWithRedirect}>Login</Nav.Link>
        )}
      </Nav>
    </BNavbar>
  );
};

export default Navbar;
