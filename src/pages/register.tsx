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
=======
import Image from 'next/image';
import Button from '@/components/Button/button';
import styles from './register.module.css';

export default function Home() {
  //theres definetly wayyy better ways to do this but this is the best I can come up with rn with the research i've done
  //gonna have to figure out how to make the text appear as the picture slides
  //its not actively registering that the cursor is still over the proximity of the image so it just slides back before i move the cursor

  return (
    <div className={styles.container}>
      <div className="content">
        <div className={styles.title}>
          Security Society at LSU
        </div>
        <div className={styles.title}>
          Register
        </div>
        <div className={styles.loginRight}>
          <form className={styles.loginBox}>
>>>>>>> origin/dev
            <input
              placeholder="Enter your email here."
              type="email"
              required
<<<<<<< HEAD
              value={email}
              onChange={(e) => setEmail(e.target.value)}
=======
>>>>>>> origin/dev
              className={styles.loginInput}
            />
            <input
              placeholder="Enter your password here."
              type="password"
              required
              minLength={6}
<<<<<<< HEAD
              value={password}
              onChange={(e) => setPassword(e.target.value)}
=======
>>>>>>> origin/dev
              className={styles.loginInput}
            />
            <input
              placeholder="Confirm your password."
              type="password"
              required
              minLength={6}
<<<<<<< HEAD
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
=======
              className={styles.loginInput}
            />
            <Button
              text="Register"
              type="submit"
            />
          </form>
        </div>
        <Image
          src="/SSLIcon.png"
          alt="SSL Icon"
          className={styles.sslicon}
          width={100}
          height={100}
        />
>>>>>>> origin/dev
      </div>
    </div>
  );
}
