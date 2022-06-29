import React, { useState } from "react";
import * as sessionActions from "../../../../store/session";
import { useDispatch, useSelector  } from "react-redux";
import { Redirect } from "react-router-dom";


function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/songs" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signupFormContainer">
      <h2>Sign Up</h2>
      <form className='signupForm' onSubmit={handleSubmit}>
        <div className="error-list">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
          <input
            type="email"
            id='email'
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            id='username'
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <input
            type="password"
            id='password'
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button className="button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
