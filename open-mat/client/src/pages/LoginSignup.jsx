import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // adding for password error feature
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); //adding this for error on typing
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "http://127.0.0.1:8000/api/auth/register/"
      : "http://127.0.0.1:8000/api/auth/login/"

    try {
      const res = await axios.post(url, formData);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      if (!isSignup) {
        setError("hey! wrong password!"); //warning when putting the wrong password when logging in
      }
    }
  };
  
  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      padding: "20px",
    }}
  >
    <div
      style={{
        backgroundColor: "#e11d2e", // same red as homepage
        borderRadius: "20px",
        padding: "60px 40px",
        width: "100%",
        maxWidth: "700px",
        color: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        textAlign: "center",
      }}
    >
      <h1 style={{ letterSpacing: "4px", marginBottom: "10px" }}>
        {isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}
      </h1>

      <p style={{ marginBottom: "30px", opacity: 0.9 }}>
        {isSignup
          ? "Join the Open Mat community"
          : "Log in to find open mats near you"}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="form-control"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="form-control"
        />

        {error && (
          <p style={{ color: "#ffd1d1", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="outline-light"
          size="lg"
        >
          {isSignup ? "Sign Up" : "Login"}
        </Button>
      </form>

      <Button
        variant="link"
        style={{
          marginTop: "20px",
          color: "white",
          textDecoration: "underline",
        }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign up"}
      </Button>
    </div>
  </div>
);

};