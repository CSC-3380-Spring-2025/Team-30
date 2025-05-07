<<<<<<< HEAD
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
        setError(data.message || 'Login failed');
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
=======
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button/button';
import styles from './Login.module.css';
import { useState } from 'react';

export default function Home() {
//theres definetly wayyy better ways to do this but this is the best I can come up with rn with the research i've done
//gonna have to figure out how to make the text appear as the picture slides
//its not actively registering that the cursor is still over the proximity of the image so it just slides back before i move the cursor

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>Security Society at LSU</div>
        <div className={styles.subtitle}>Log in</div>
        <div className={styles.loginRight}>
          <form className={styles.loginBox}>
>>>>>>> origin/dev
            <input
              placeholder="Email"
              type="email"
              required
<<<<<<< HEAD
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
=======
              className={styles.loginInput}
            />
            <div className={styles.passwordWrapper}>
              <input
                placeholder="Password"
                type={passwordVisible ? 'text' : 'password'}
                required
                minLength={6}
                className={styles.loginInput}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => { setPasswordVisible((v) => !v); }}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <Button text="Log In" type="submit" />
            <div className={styles.registerText}>
              Don&apos;t have an account set up?{' '}
              <Link href="/register">Register here.</Link>
            </div>
          </form>
        </div>
        <div className={styles.iconWrapper}>
          <Image
            src="/SSLIcon.png"
            alt="SSL Icon"
            width={100}
            height={100}
          />
        </div>
>>>>>>> origin/dev
      </div>
    </div>
  );
}
