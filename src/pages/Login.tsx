import { useState } from "react";
import styles from '../styles/Login.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // 🔐 Save token
        setSuccess('Login successful!');
        console.log('Logged in officer:', data.user);

        // Optional: redirect to dashboard
        // router.push("/dashboard");
      } else {
        setError(data.message ?? 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong during login.');
    }
  };

  return (
    <div className={styles.container}>
      <div className="topBox"></div>
      <div className="content">
        <div className={styles.title}>Security Society at LSU</div>
        <div className={styles.title}>Log in</div>

        <div className={styles.loginRight}>
          <form className={styles.loginBox} onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.loginInput}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
            />

            <div className={styles.registerText}>
              Don't have an account set up? <a href="/register">Register here!</a>
            </div>

            <button className={styles.loginButton} type="submit">
              Log In
            </button>
          </form>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
        </div>

        <img src="./SSLIcon.png" alt="SSL Icon" className={styles.sslicon} />
      </div>

      <div className="bottomBox">
        <p className={styles.bottomText}>©2025 Security Society at LSU</p> 
      </div>
    </div>
  );
}
