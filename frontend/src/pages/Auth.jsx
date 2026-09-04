
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Sauvegarder le token et l'utilisateur
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("LOGIN USER:", user);

      // =========================
      // REDIRECTION SELON LE ROLE
      // =========================

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/HomeUser");
      }

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      const { token, user } = res.data;

      // Sauvegarder le token et l'utilisateur
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("REGISTER USER:", user);

      // Après inscription
      // un utilisateur normal va vers /home
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/HomeUser");
      }

    } catch (err) {
      console.error(
        "REGISTER ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  // =========================
  // FORM SUBMIT
  // =========================
  const handleAuth = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <div
      className={`auth-wrapper ${
        isLogin ? "login" : "register"
      }`}
    >

      {/* LEFT PANEL */}
      <div className="auth-left">

        <h1>Welcome 👋</h1>

        <p>
          Start your journey with us
        </p>

        <button
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Create account"
            : "Back to login"}
        </button>

      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <div className="glass-card">

          <h2>
            {isLogin ? "Login" : "Register"}
          </h2>

          <form onSubmit={handleAuth}>

            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
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

