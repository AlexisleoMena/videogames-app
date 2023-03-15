import React from 'react'
import { Link } from "react-router-dom"

import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container} >
      <h2 className={styles.neonText}>Welcome to</h2>
      <h1 className={styles.neonText}>Games App </h1>

      <div className={styles.btn_container}>
        <Link to="/home">
          <button className={styles["learn-more"]}>
            <span className={styles.circle} aria-hidden="true">
              <span className={`${styles.icon} ${styles.arrow}`}></span>
            </span>
            <span className={styles["button-text"]}>START</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
