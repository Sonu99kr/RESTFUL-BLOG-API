import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/users/register", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.error(
        "Registration Failed:",
        err.response?.data?.message || err.message
      );
      alert(
        "Error: " + (err.response?.data?.message || "Registration failed.")
      );
    }
  };

  return (
    <>
      <form className="register-container" onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}
