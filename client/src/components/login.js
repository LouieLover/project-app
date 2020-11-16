import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.displayName}</h1>
      ) : (
        <>
          <h2>Login Silly</h2>
          <Link to="/login">click</Link>
        </>
      )}
    </div>
  );
}
