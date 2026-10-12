import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../utils/firebaseAuth";
import bskimg from "../assets/bskimg.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  // When a page requires login (resume builder, MAANG sub-topics),
  // RequireAuth forwards the originally requested page via router state
  // so we can send the user back there after signing in.
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = await loginWithEmail(email, password);
      localStorage.setItem(
        "bsk_current_user",
        JSON.stringify({
          id: user.uid,
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
        }),
      );
      navigate(from, { replace: true });
    } catch (err) {
      const code = err?.code || "";
      let msg = "Login failed. Please try again.";

      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-login-credentials"
      ) {
        msg =
          "Invalid email or password. You can also login with Google account.";
      } else if (code === "auth/user-not-found") {
        msg =
          "No account found with this email. You can also login with Google account.";
      } else if (code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Please try again later.";
      } else if (err?.message) {
        msg = err.message;
      }

      setError(msg);
      console.error("Login error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const user = await loginWithGoogle();
      localStorage.setItem(
        "bsk_current_user",
        JSON.stringify({
          id: user.uid,
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
        }),
      );
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.message || "Google login failed. Please try again.";
      setError(msg);
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="main-container auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <img src={bskimg} className="auth-logo" alt="BSK Coding" />
          <h2 className="auth-title">Welcome to BSK CODING</h2>
          <p className="auth-subtitle">
            Sign in to continue your learning journey
          </p>
        </div>
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="auth-actions">
            <button type="submit" className="auth-button primary">
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="auth-button secondary"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>
        <div className="auth-actions">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="auth-button google"
          >
            <span className="google-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.03 2.53-2.18 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </span>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
