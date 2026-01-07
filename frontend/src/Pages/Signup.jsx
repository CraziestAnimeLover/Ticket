import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext); // optional: log in immediately after signup
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", data);
      // automatically log in after signup
      login(res.data);
      navigate("/"); // redirect to home
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Signup Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Enter your name"
          value={data.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Enter your email"
          value={data.email}
          type="email"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="password"
          placeholder="Enter your password"
          value={data.password}
          type="password"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-black text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
