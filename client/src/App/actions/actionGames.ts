import axios from "axios";
import {
  cleanUpDetailReducer,
  deepCleanUpReducer,
  getAllGamesReducer,
  getDetailsReducer,
  getGameByNameReducer,
  setCurrentPageReducer,
  setFiltersReducer,
  setLoadingReducer,
  applyFiltersReducer,
  postGameReducer,
} from "../slices/videogames";

export function getAllGames() {
  return async function (dispatch: any) {
    try {
      const res = await axios("http://localhost:3001/games");
      return dispatch(getAllGamesReducer(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setLoading(payload: boolean) {
  return function (dispatch: any) {
    return dispatch(setLoadingReducer(payload));
  };
}

export function setCurrentPage(payload: number) {
  return function (dispatch: any) {
    return dispatch(setCurrentPageReducer(payload));
  };
}

export function getDetails(id: string | undefined) {
  return async function (dispatch: any) {
    try {
      const res = await axios("http://localhost:3001/games/" + id);
      return dispatch(getDetailsReducer(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanUpDetail() {
  return function (dispatch: any) {
    return dispatch(cleanUpDetailReducer());
  };
}

export function getGameByName(name: string | undefined) {
  return async function (dispatch: any) {
    try {
      const res = await axios("http://localhost:3001/games?name=" + name);
      return dispatch(getGameByNameReducer(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deepCleanUp() {
  return function (dispatch: any) {
    return dispatch(deepCleanUpReducer());
  };
}

interface filtersInterface {
  order: string;
  genre: string;
  createdInDB: string;
  reverse: boolean;
}

export function setFilters(payload: filtersInterface) {
  return function (dispatch: any) {
    return dispatch(setFiltersReducer(payload));
  };
}

export function applyFilters() {
  return function (dispatch: any) {
    return dispatch(applyFiltersReducer());
  };
}

export function postGame(data: any) {
  return function (dispatch: any) {
    return new Promise(function (resolve, reject) {
      axios
        .post("http://localhost:3001/games", data)
        .then((res) => {
          resolve(res);
          dispatch(postGameReducer(data));
        })
        .catch((error) => reject(error));
    });
  };
}
