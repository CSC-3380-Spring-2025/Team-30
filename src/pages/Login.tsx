// import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component
import styles from './Login.module.css'
import { useState } from "react";

export default function Home() {
  const [isMoving, setIsMoving] = useState(false);
//theres definetly wayyy better ways to do this but this is the best I can come up with rn with the research i've done
//gonna have to figure out how to make the text appear as the picture slides
//its not actively registering that the cursor is still over the proximity of the image so it just slides back before i move the cursor


  return (
    <div className={styles.container}>
      <div className="topBox">
      </div>
      <div className="content">
        <div className={styles.title}>
          Security Society at LSU
        </div>
        <div className={styles.title}>
          Log in
        </div>
        <div className={styles.loginRight}>
            <form className={styles.loginBox}>
              <input
                placeholder="Email"
                type="email"
                required
                className={styles.loginInput}
              />
              <input
                placeholder="Password"
                type="password"
                required
                minLength={6}
                className={styles.loginInput}
              />

        <div className ={styles.registerText}>
          Don't have an account set up? <a href="/register">Register here!</a>
        </div>
              <button className={styles.loginButton} type="submit">
                Log In
              </button>
            </form>
      </div>
      <img src="./SSLIcon.png" alt="SSL Icon" className={styles.sslicon} />
    </div>

    <div className="bottomBox">
        <p className={styles.bottomText}>©2025 Security Society at LSU</p> 
      </div>
    </div>
  );
}