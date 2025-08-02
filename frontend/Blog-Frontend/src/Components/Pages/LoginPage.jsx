import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("toekn", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(
        "Login Failed:",
        err.response?.data?.message || err.message
      );
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <h2>Login</h2>
      <form className="login-container" onSubmit={handleSubmit}>
        <div>
          <label>Email Address: </label>
          <input
            type="email"
            placeholder="Enter your Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassoword(e.target.value)}
            required
          />
        </div>
        <button type="submit">SignIn</button>
        <p>
          Don't have a Account? <a href="/register">Register Now</a>
        </p>
      </form>
    </>
  );
}

export default LoginPage;
