import axios from "axios"
// import { filterGames } from '../../redux/actions/actionGames'
// import { clearFilter, setGenreFilter, setCreatedInDBFilter, setOrderFilter, setReverseFilter } from '../../redux/actions/actionFilters';

import styles from "./Filters.module.css";
import { useAppDispatch, useAppSelector } from '../../App/Hooks/Hooks';
import { useEffect, useState } from "react";
import { applyFilters, setFilters, setLoading } from "../../App/actions/actionGames";

interface filtersInterface {
  order: string
  genre: string 
  createdInDB: string
  reverse: boolean 
}

const Filters = () => {
  const dispatch = useAppDispatch()
  const [openFilters, setOpenFilters] = useState(false);
  const [genres, setGenres] = useState([]);

  const filters = useAppSelector((state) => state.filters);

  function handleFilters(e: any, filterName: string ) {
    dispatch(setLoading(true));
    if(filters[filterName as keyof filtersInterface] === e.target.value) {
      return handleResetFilter(filterName)
    }
    filterName === "order" 
      ? dispatch(setFilters({ ...filters, order: e.target.value, reverse: false }))
      : dispatch(setFilters({ ...filters, [filterName]: e.target.value }));
    dispatch(applyFilters());
    window.scroll({ top: 0, behavior: "smooth" })
  }

  function handleResetFilter(name: string) {
    dispatch(setLoading(true));
    name === "order"
      ? dispatch(setFilters({ ...filters, order: "", reverse: false }))
      : dispatch(setFilters({ ...filters, [name]: "" }));
    dispatch(applyFilters());
  }

  function handleReverse(value: boolean) {
    dispatch(setLoading(true));
    dispatch(setFilters({ ...filters, reverse: value }));
    dispatch(applyFilters());
    window.scroll({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("/genres");
        setGenres(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setGenres]);

  useEffect(() => {
    const handleClick = (e: any) => {
      !document.getElementById('filtersContainer')?.contains(e.target) 
        && !document.getElementById('statusFilterButton')?.contains(e.target)
        && setOpenFilters(false);
    }
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setOpenFilters]);

  return (
    <div id="filtersContainer" className={styles.container}>
      <div className={`${styles.btn__filter} ${styles.active__boton}`} >
        <i className="fas fa-sliders-h" onClick={(e) => { setOpenFilters(!openFilters) }}></i>
        <h3>FILTERS</h3>
        <div className={styles.filters__actives}>
          {
            filters.order.length>0 && 
              <div 
                className={styles.filter__active}
                onClick={(e) => { handleResetFilter("order") }}
              >
                "<span>{filters.order}</span>"
                <i className="fas fa-times"></i>
              </div>
          }
          {
            filters.createdInDB.length>0 && 
              <div 
                className={styles.filter__active}
                onClick={(e) => { handleResetFilter("createdInDB") }}
              >
                "<span>{filters.createdInDB}</span>"
                <i className="fas fa-times"></i>
              </div>
          }
          {
            filters.genre.length>0 && 
              <div 
                className={styles.filter__active}
                onClick={(e) => { handleResetFilter("genre")}}
              >
                "<span>{filters.genre}</span>"
                <i className="fas fa-times"></i>
              </div>
          }
        </div>

      </div>

      <div className={`${styles.options__filters} ${ openFilters && styles.open_container}`}>

        <div className={styles.item}>
          <h3>ORDER</h3>
          <hr />
          <div>
            <label>
              <input
                type="checkbox"
                value="Alphabetical"
                onChange={(e) => { handleFilters(e, "order") }}
                checked={filters.order === "Alphabetical"}
              />
              <span>ALPHABETICAL</span>
              {filters.order === "Alphabetical" && <i className="fas fa-times"></i>}
            </label>

            <label>
              <input
                type="checkbox"
                value="rating"
                onChange={(e) => { handleFilters(e, "order") }}
                checked={filters.order === "rating"}
              />
              <span>RATING</span>
            </label>
          </div>
          <div className={styles.reverse__container}>
            {filters.order === "Alphabetical" 
              &&  <>
                    <i
                      className={`fas fa-sort-alpha-down ${!filters.reverse && styles.active}`}
                      onClick={(e) => { handleReverse(false) }}
                      key="Population_Asc"
                      ></i>
                    <i
                      className={`fas fa-sort-alpha-down-alt ${filters.reverse && styles.active}`}
                      onClick={(e) => { handleReverse(true) }}
                      key="Population_Desc"
                      ></i>
                  </>
            }
            {filters.order === "rating" 
              && <i className="fas fa-times"></i>
              &&  <>
                    <i
                      className={`fas fa-sort-numeric-down ${!filters.reverse && styles.active}`}
                      onClick={(e) => { handleReverse(false) }}
                      key="Alphabetical_Asc"
                    ></i>
                    <i
                      className={`fas fa-sort-numeric-down-alt ${filters.reverse && styles.active}`}
                      onClick={(e) => { handleReverse(true) }}
                      key="Alphabetical_Desc"
                    ></i>
                  </>  
            }
          </div>
        </div>

        <div className={styles.item}>
          <h3>UBICATION</h3>
          <hr />
          <div>
            <label key={"API"}>
              <input
                type="checkbox"
                value={"API"}
                onChange={(e) => { handleFilters(e, "createdInDB")}}
                checked={filters.createdInDB === "API"}
              />
              <span>API</span>
              {filters.createdInDB === "API" && <i className="fas fa-times"></i>}
            </label>
            <label key={"DATABASE"}>
                <input
                  type="checkbox"
                  value={"DATABASE"}
                  onChange={(e) => {handleFilters(e, "createdInDB") }}
                  checked={filters.createdInDB === "DATABASE"}
                />
                <span>DATABASE</span>
                {filters.createdInDB === "DATABASE" && <i className="fas fa-times"></i>}
            </label>

          </div>

        </div>

        <div className={styles.item}>
          <h3>GENRES</h3>
          <hr />
          <div>
            {
              genres?.map((a: any) => (
                <label key={a}>
                  <input
                    type="checkbox"
                    value={a}
                    onChange={(e) => { handleFilters(e, "genre")}}
                    checked={filters.genre === a}
                  />
                  <span>{a.toUpperCase()}</span>
                  {filters.genre === a && <i className="fas fa-times"></i>}
                </label>
              ))
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default Filters
