import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://localhost:3000/api/auth/login"
        : "http://localhost:3000/api/auth/register";

      const body = isLogin
        ? { email, password }
        : { username, email, password };

      const res = await axios.post(url, body);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(res.data.user.role === "admin" ? "/admin" : "/home");
    } catch (err) {
      alert(err.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className={`auth-wrapper ${isLogin ? "login" : "register"}`}>

      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>Welcome 👋</h1>
        <p>Start your journey with us</p>

        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create account" : "Back to login"}
        </button>
      </div>

      {/* RIGHT PANEL (FORM) */}
      <div className="auth-right">

        <div className="glass-card">

          <h2>{isLogin ? "Login" : "Register"}</h2>

          <form onSubmit={handleAuth}>

            {!isLogin && (
              <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            )}

            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              {isLogin ? "Login" : "Register"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Auth;