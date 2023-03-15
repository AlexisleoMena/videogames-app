import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cleanUpDetail, getDetails } from '../../App/actions/actionGames'
import { useAppDispatch, useAppSelector } from '../../App/Hooks/Hooks'
import background from "../../assets/images/background.jpg"
import styles from "./Details.module.css"

const Details = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const details = useAppSelector( (state) => state.details)

  useEffect( () => {
    dispatch(getDetails(id));
    return () => dispatch(cleanUpDetail())
  }, [id, dispatch])

  window.scroll(0,0);

  return (
    <div 
      className={styles.container} 
      style={{ backgroundImage: details?.image ? "url("+details?.image+")" : "url("+background+")" }}
    >
      <button className={styles.btn__back} onClick={()=>navigate(-1)}><i className="fas fa-arrow-left"></i></button>
      <div className={styles.contents}>
        <div>
          <h1>{details?.name}</h1>
          <p dangerouslySetInnerHTML={{__html: details?.description}}></p>
        </div>
        <ul>
          <li><strong>released: </strong> {details?.released}</li>
          <li><strong>platforms: </strong> {details?.platforms?.join(", ")}</li>
          <li><strong>rating: </strong> {details?.rating}</li>
        </ul>
      </div>
    </div>
  )
}

export default Details
