import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
// import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, password };
      await Axios.post("/user/register/", newUser);
      const loginRes = await Axios.post("/user/login/", {
        username,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {/* {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )} */}
      <form className="form" onSubmit={submit}>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
