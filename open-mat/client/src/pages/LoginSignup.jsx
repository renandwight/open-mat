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
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-xl mb-4">
        {isSignup ? "Create Account" : "Login"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 me-3"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 me-3"
        />
        {/* to populate error message */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button
          type="submit"
          variant="outline-primary"
        >
          {isSignup ? "Sign Up" : "Login"}
        </Button>

      </form>

      <Button
        variant="outline-primary"
        className="mt-3"
        onClick={() => setIsSignup(!isSignup)}
      >

        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign up"}
      </Button>
    </div>
  );
};