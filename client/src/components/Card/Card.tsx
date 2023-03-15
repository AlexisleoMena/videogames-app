import React from 'react'
import styles from "./Card.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  name: string
  image: string
  genres: Array<string>
}
const Card = ({name, image, genres}: Props) => {
  return (
    <div className={styles.card_container}>
      <LazyLoadImage
        src={image}
        alt=""
        className={styles.img}
        // width={700} height={500}
        // placeholderSrc={placeholder}
        effect='opacity' // opacity | black-and-white
      />
      <div className={styles.info_container}>
        <h2>{name}</h2>
        <p>{genres?.join(", ")}</p>
      </div>
    </div>
  )
}

export default Card
