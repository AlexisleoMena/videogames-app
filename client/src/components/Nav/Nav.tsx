import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  deepCleanUp,
  getGameByName,
  setLoading,
} from "../../App/actions/actionGames";
import { useAppDispatch } from "../../App/Hooks/Hooks";
import styles from "./Nav.module.css";

const Nav = () => {

  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [showNavBar, setShowNavBar] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleBtnCancel = (e: any) => {
    setShowNavBar(false);
    setShowSearchBar(false);
  };

  function handleChange(e: any) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(getGameByName(name));
    dispatch(setLoading(true));
    setName("");
  }

  return (
    <div className={styles.container}>

        <div className={styles.menu__icon}>
          <span className={`fas fa-bars ${showNavBar && styles.hide}`} onClick={(e) => {setShowNavBar(true)}}></span>
        </div>

        <h1 className={styles.logo} onClick={ () => dispatch(deepCleanUp())}>
          Games App
        </h1>
        
        <div className={`${styles.nav__container} ${showNavBar && styles.active}`}>

           <li onClick={() => dispatch(deepCleanUp())}>
             <Link to="/home"> Home </Link>
           </li>
           <li>
             <Link to="create/"> Create game </Link>
           </li>
           <li>
             <Link to="/"> Exit </Link>
           </li>
        </div>

        <div className={`${styles.search__icon} ${!showSearchBar && !showNavBar ? styles.show : ""}`}>
          <span className="fas fa-search" onClick={(e) => {setShowSearchBar(true)}} ></span>
        </div>

        <div 
          className={`${styles.cancel__icon} ${showSearchBar || showNavBar ? styles.show : ""}`}
          style={{ color: showSearchBar || showNavBar ? "#ff3d00" : '#fff' }}
        >
          <span className="fas fa-times" onClick={(e) => {handleBtnCancel(e)}}></span>
        </div>

        <form className={`${showSearchBar && styles.active}`}>
          
          <input 
            type="search" 
            value={name} 
            className={styles.search__data} 
            placeholder="Search" 
            required 
            onChange={e => handleChange(e)}
          />
          <button 
            type="submit" 
            className={`fas fa-search ${styles.submit__btn}`} 
            onClick={e => { handleSubmit(e) }}
          ></button>
        </form>
    </div>
  )
}

export default Nav;