import React from 'react'
import linkedinIcon from "../../assets/images/linkedinIcon.png"
import githubIcon from "../../assets/images/githubIcon.png"
import styles from "./Footer.module.css"
const Footer = () => {
  return (
    <div className={styles.container}>
      <span>Created by: Alexisleo</span>
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/alexis-leonardo-mena/">
        <img className={styles.imgLinkedin} src={linkedinIcon} alt="" height="25px" width="25px"/>
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/AlexisleoMena">
        <img className={styles.imgGithub} src={githubIcon} alt="" height="25px" width="25px" />
      </a>
    </div>
  )
}

export default Footer