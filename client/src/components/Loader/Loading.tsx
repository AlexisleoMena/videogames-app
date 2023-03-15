import React from 'react'

import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.d1}></div>
      <div className={styles.d2}></div>
    </div>
  )
}

export default Loading
