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
            <input
              placeholder="Email"
              type="email"
              required
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
      </div>
    </div>
  );
}