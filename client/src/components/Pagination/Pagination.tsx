import React from 'react'
import { useAppSelector } from '../../App/Hooks/Hooks';
import styles from "./Pagination.module.css";

interface Props {
  gamesPerPage: number
  totalGames: number
  selectPageNumber: (n:number) => {}
}

const Pagination = ({ gamesPerPage, totalGames, selectPageNumber }: Props) => {

  const currentPage = useAppSelector((state) => state.currentPage);

  function handleNumberPage(totalPages: number, pageSelected: number) {
    createPagination(totalPages, pageSelected);
    selectPageNumber(pageSelected);
    // window.scroll({
    //   top: 0,
    //   behavior: "smooth"
    // });
    window.scroll(0,0);

  }

  const createPagination = (totalPages: number, page = currentPage) => {

    let liTags = [];

    if (page > 1 && totalPages > 2) {
      liTags.push(
        <li 
          className={styles.prev} 
          key="prev" 
          onClick={(e) => { handleNumberPage(totalPages, page - 1) }}
        >
          <span>
            <i className="fas fa-chevron-left"></i>
            {" Prev"}
          </span>
        </li>
      )
    }
    if (page > 2 && totalPages > 3) {
      liTags.push(
        <li 
          className={`${styles.first} ${styles.numb}`} 
          key="PagOne" 
          onClick={(e) => { handleNumberPage(totalPages, 1) }}
        >
          <span>1</span>
        </li>
      )
    }
    if (page > 2 && page > 3 && totalPages > 3) {
      liTags.push(
        <li className={styles.dots} key="dots1">
          <span>...</span>
        </li>
      )
    }

    let beforePage = page === 1 ? 1 : page - 1; // En pagina 1 inicio desde 1, sino desde la pagina anterior a la actual
    (page === totalPages  && totalPages>3) && (beforePage = beforePage - 2); // En la pagina 25 inicio desde 22
    (page === totalPages - 1 && totalPages>3) && (beforePage = beforePage - 1); // En la pagina 24 inicio desde 21
    
    let afterPage = page === totalPages ? totalPages : page + 1; // En la ultima pagina termino ahi, sino desde la pagina posterior a la actual
    (page === 1  && totalPages > 3) && (afterPage = afterPage + 2); // En la pagina 1 termino en 3
    (page === 2  && totalPages > 3) && (afterPage = afterPage + 1); // En la pagina 2 termino en 3

    for (let i = beforePage; i <= afterPage; i++) {
      if (page === i) {
        liTags.push(
          <li 
            className={`${styles.numb} ${styles.active}`}  
            key={i} 
            onClick={(e) => { handleNumberPage(totalPages, i) }}
          >
            <span>{i}</span>
          </li>
        )
      }else{
        liTags.push(
          <li 
            className={styles.numb} 
            key={i} 
            onClick={(e) => { handleNumberPage(totalPages, i) }}
          >
            <span>{i}</span>
          </li>
        )
      }
    }

    if (page < totalPages - 1 && page < totalPages - 2 && totalPages > 3){
      liTags.push(
        <li className={styles.dots} key="dots2">
          <span>...</span>
        </li>
      )
    }

    if (page < totalPages - 1 && totalPages > 3) {
      liTags.push(
        <li 
          className={`${styles.last} ${styles.numb}`} 
          key="PagUltimate" 
          onClick={(e) => { handleNumberPage(totalPages, totalPages) }}
        >
          <span>{totalPages}</span>
        </li>
      )
    }

    if (page < totalPages && totalPages > 2) {
      liTags.push(
        <li 
          className={styles.next} 
          key="next" 
          onClick={(e) => { handleNumberPage(totalPages, page + 1) }}
        >
          <span>
            {"Next "}
            <i className="fas fa-chevron-right"></i>
          </span>
        </li>
      )
    }
    return liTags;
  }

  let totalNumberPages = Math.ceil(totalGames / gamesPerPage);

  return (
    totalNumberPages<=1 
    ? <div></div>
    : <div className={styles.pagination_container}>
        <ul>
          {createPagination(totalNumberPages, currentPage)}
        </ul>
      </div>
  )
}

export default Pagination
