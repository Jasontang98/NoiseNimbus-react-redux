import React, { useState } from "react";
import * as sessionActions from "../../../../store/session";
import { useDispatch } from "react-redux";


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
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
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
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
    </div>
  );
}

export default LoginForm;
