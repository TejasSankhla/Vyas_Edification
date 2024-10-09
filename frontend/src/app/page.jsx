"use client";
import react, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [roles, setroles] = useState([]);
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const [userRoles, setUserRoles] = useState([]);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  async function handleLogin() {
    try {
      const result = await axios.post(
        "http://localhost:5500/api/join/sign-in",
        {
          email: loginEmail,
          password: loginPassword,
        },
        axiosConfig
      );
      setUserRoles(result.data.roles);
      const role = result.data.roles;
      if (role.includes("p0")) {
        setisAdmin(true);
      }
      console.log(result);
    } catch (error) {}
  }
  useEffect(() => {
    console.log(userRoles);
  }, [userRoles]);
  async function handleAddUser() {
    try {
      const result = await axios.post(
        "http://localhost:5500/api/join/sign-up",
        {
          name,
          email,
          roles,
        },
        axiosConfig
      );

      console.log("New user generated : ", result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRoleChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    console.log(selectedOptions);

    setroles(selectedOptions);
  };
  return (
    <div className="container flex flex-col justify-center items-center">
      {isAdmin ? (
        <div className=" flex flex-col form">
          <div>Add USers</div>
          <label htmlFor="name">ADD NAME : </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-blue-200"
          />
          <label htmlFor="email">ADD Email : </label>
          <input
            id="email"
            type="text"
            onChange={(e) => setemail(e.target.value)}
            className="bg-blue-200"
            value={email}
          />
          <label htmlFor="name">ADD Role : </label>
          <select multiple onChange={handleRoleChange} className="bg-gray-300">
            <option value={"p0"}>p0</option>
            <option value={"p1"}>p1</option>
            <option value={"p2"}>p2</option>
          </select>
          <button onClick={handleAddUser} className="bg-green-400 m-4">
            ADD User
          </button>
        </div>
      ) : null}
      <div className=" flex flex-col form">
        <div className="login-form-heading text-center m-8">User Login</div>
        <label htmlFor="login-email">ADD Email : </label>
        <input
          id="login-email"
          type="text"
          value={loginEmail}
          onChange={(e) => setloginEmail(e.target.value)}
          className="bg-blue-200"
        />
        <label htmlFor="login-pass">ADD Pass : </label>
        <input
          id="login-pass"
          type="text"
          onChange={(e) => setloginPassword(e.target.value)}
          className="bg-blue-200"
          value={loginPassword}
        />

        <button onClick={handleLogin} className="bg-green-400 m-4">
          Log-In
        </button>
      </div>
      {isAdmin ? <div>ADMIN PANEL</div> : null}
    </div>
  );
}
