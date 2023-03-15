import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../App/Hooks/Hooks';
import { getAllGames, setCurrentPage, setLoading } from '../../App/actions/actionGames';
import Card from '../Card/Card';
// import Filters from '../Filters/Filters';
// import Footer from '../Footer/Footer'
// import Loading from '../Loader/Loading';
// import Nav from '../Nav/Nav';
// import Pagination from '../Pagination/Pagination';

import styles from "./Home.module.css";
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Loading from '../Loader/Loading';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';

interface game {
  id: number
  name: string
  image: string
  genres: Array<string>
  rating: number
  platforms: Array<string>
  createdInDB: boolean
}

const Home = () => {
  const dispatch = useAppDispatch();
  let {games, loading, currentPage, emptyAfterSearched, emptyAfterFiltered} = useAppSelector((state) => state);

  useEffect(() => {
    if(!games.length && !emptyAfterSearched && !emptyAfterFiltered) {
      dispatch(setLoading(true))
      dispatch(getAllGames())
    }
  }, [dispatch, games.length, emptyAfterSearched, emptyAfterFiltered]);

  
  const gamesPerPage = 15;

  //Conjunto de elementos sustraidos del estado "countries" segun el valor del parametro de la funcion "selectPageNumber"
  const lastIndex = currentPage * gamesPerPage; // 1*12=12
  const firstIndex = lastIndex - gamesPerPage; //12-12=0
  let currentGames = games.slice(firstIndex, lastIndex); //countries.slice(1,12)
  
  //funcion que despacha la accion que actualiza el numero de la pagina
  const selectPageNumber = (pageNumber: number) => dispatch(setCurrentPage(pageNumber)); 
  
  return (
    <div className={styles.container}>
      <Nav />
        <Filters /> 
        <div className={styles.cardsContainer}>
          {loading
            ? <Loading />
            : emptyAfterSearched
              ? <p className={styles.no_results}>No search results!</p>
              : emptyAfterFiltered            
                ? <p className={styles.no_results}>No filter results!</p>
                : currentGames?.map((game : game) => 
                    <Link to={"/details/"+game.id} key={game.id} >
                      <Card
                        key={game.id}
                        name={game.name}
                        image={game.image}
                        genres={game.genres}
                      />
                    </Link>
                  )
          }
        </div>
      <div className={styles.pagination}>
        {(loading || emptyAfterFiltered || emptyAfterSearched)
          ? null
          : <Pagination
            gamesPerPage={gamesPerPage}
            totalGames={games.length}
            selectPageNumber={selectPageNumber} />
        }
      </div>
   
      <Footer /> 
    </div>
  )
}
export default Home;