import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  async function signup(username) {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const result = await response.json();
      console.log(result, "\n");

      console.log(result.token);

      if (result.token) {
        setToken(result.token);
        setLocation("TABLET");
      }

      return result.token;
    } catch (error) {
      console.error("Error");
    }
  }

  // TODO: authenticate
  async function authenticate(token) {
    try {
      const response = await fetch(API + "/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        setLocation("TUNNEL");
      }

      return result;
    } catch (error) {
      console.error(error);
    }
    setToken(result.token);
  }

  const value = {
    location,
    setLocation,
    signup,
    authenticate,
    token,
    setToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
