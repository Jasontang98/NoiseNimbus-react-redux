import React, { useState } from "react";
import { login } from "../../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/Songs" />;

  const handleDemoUser = async (e) => {
    e.preventDefault();
    setErrors([]);

    const credential = "Demo-lition";
    const password = "password";

    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
      <div className="loginFormContainer">
        <h2>Login</h2>
        <form className='loginForm' onSubmit={handleSubmit}>
          <div className="error-list">
            {errors.map((error) => (
              <div key={error}>{error}</div>
              ))}
        </div>
          <input
            type="text"
            id='username'
            placeholder="Username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            type="password"
            id='password'
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button className="button" type="submit">Login</button>
      </form >
      <form onSubmit={handleDemoUser}>
        <button className="button" type="submit">Demo User</button>
      </form>
    </div>
  );
}

export default LoginForm;
