import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post("/register", {
        name,
        username,
        password,
      });

      if (request.status === 201) {
        return request.data.message;
      }
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", request.data);

      if (request.status === 200 && request.data?.token) {
        localStorage.setItem("token", request.data.token);
        setUserData(request.data.user);
        navigate("/home");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    logout,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
