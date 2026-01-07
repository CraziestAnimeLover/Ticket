// src/pages/Login.jsx
import axios from "../api/axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/auth/login", { email, password });
    login(res.data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn">Login</button>
    </form>
  );
}
