// basically a copy of the login page
import Button from '@/components/Button/button';
import styles from './register.module.css'
import { useState } from "react";

export default function Home() {
  const [isMoving, setIsMoving] = useState(false);
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
              <input
                placeholder="Enter your email here."
                type="email"
                required
                className={styles.loginInput}
              />
              <input
                placeholder="Enter your password here."
                type="password"
                required
                minLength={6}
                className={styles.loginInput}
              />
            <input
                placeholder="Confirm your password."
                type="password"
                required
                minLength={6}
                className={styles.loginInput}
              />
              <Button
                text="Log In"
                type="submit"
              >
              </Button>
            </form>
      </div>
      <img src="./SSLIcon.png" alt="SSL Icon" className={styles.sslicon} />
    </div>
    </div>
  );
}