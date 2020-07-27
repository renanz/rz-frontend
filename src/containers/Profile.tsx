import React from "react";
import { Container } from "react-bootstrap";
import { useAuth0 } from "../services/AuthService/react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Container>
  );
};

export default Profile;
