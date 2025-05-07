<<<<<<< HEAD
import styles from '../styles/register.module.css';
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('member');  // default role is "member"
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {


        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (res.ok) {
        // Handle successful registration
        const user = await res.json();
        console.log('User registered:', user);
        // Redirect or show a success message
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred while registering.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className="topBox"></div>
      <div className="content">
        <div className={styles.title}>Security Society at LSU</div>
        <div className={styles.title}>Register</div>

        <div className={styles.loginRight}>
          <form className={styles.loginBox} onSubmit={handleSubmit}>
            <input
              placeholder="Enter your email here."
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.loginInput}
            />
            <input
              placeholder="Enter your password here."
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
            />
            <input
              placeholder="Confirm your password."
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.loginInput}
            />
            <button className={styles.loginButton} type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          {error && <div className={styles.error}>{error}</div>}
        </div>
        <img src="./SSLIcon.png" alt="SSL Icon" className={styles.sslicon} />
      </div>
    </div>
  );
}
