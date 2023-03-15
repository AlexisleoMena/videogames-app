import { createSlice } from "@reduxjs/toolkit";

interface game {
  id: number
  name: string
  image: string
  genres: Array<string>
  rating: number
  platforms: Array<string>
  createdInDB: boolean
}

interface description {
  id: number
  name: string
  image: string
  genres: string[]
  rating: number
  platforms: string[]
  createdInDB: boolean
  description: string
  released: string
}

const initialDescription = {
  id: 0,
  name: '',
  image: '',
  genres: [],
  rating: 0,
  platforms: [],
  createdInDB: false,
  description: '',
  released: ''
}

interface filtersInterface {
  order: string
  genre: string 
  createdInDB: string
  reverse: boolean 
}

const initialFilters = {
  order: "",
  genre: "", 
  createdInDB: "",
  reverse: false 
}


interface state {
  allGames: game[]
  games: game[]
  details: description
  loading: boolean
  currentPage: number
  filters: filtersInterface
  emptyAfterFiltered: boolean
  emptyAfterSearched: boolean
}

let initialState: state = {
 allGames: [],
 games: [],
 details: initialDescription,
 loading: false,
 currentPage: 1,
 filters: initialFilters,
 emptyAfterFiltered: false,
 emptyAfterSearched: false
}


function filteringGames (state: state = initialState): Array<game> {
  let {order, genre, createdInDB, reverse } = state.filters;
  let copy = [...state.allGames];
  if(order.length) {
    if(order === "rating") {
      copy = copy.sort( (a,b) => a.rating - b.rating);
    } else {
      copy = copy.sort( (a,b) => a.name.localeCompare(b.name));
    }
    if(reverse) {
      copy = copy.reverse();
    }
  }
  if(createdInDB.length) {
    copy = createdInDB === "API" 
    ? copy.filter( ({createdInDB}) => createdInDB === false )
    : copy.filter( ({createdInDB}) => createdInDB === true )
  }
  if(genre.length) {
    copy = copy.filter( ({genres}) =>  genres.find( (g) => g === genre))
  }
  return copy;
}

const videogamesSlice = createSlice({
  name: "videogame",
  initialState,
  reducers: {
    getAllGamesReducer: (state, action) => {
      state.games = action.payload;
      state.allGames = action.payload.slice();
      state.loading = false;
    },
    setLoadingReducer: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPageReducer: (state, action) => {
      state.currentPage = action.payload;
    },
    getDetailsReducer: (state, action) => {
      state.details = action.payload;
    },
    cleanUpDetailReducer: (state) => {
      state.details = initialDescription;
    },
    getGameByNameReducer: (state, action) => {
      state.games = action.payload;
      state.filters = initialState.filters;
      state.emptyAfterSearched = !action.payload.length;
      state.currentPage = 1;
      state.loading = false;
    },
    deepCleanUpReducer: (state) => {
      return { 
        ...initialState, 
        games: state.allGames, 
        allGames: state.allGames.slice()
      }
    },
    setFiltersReducer: (state, action) => {
      state.filters = action.payload;
    },
    applyFiltersReducer: (state) => {
      let games = filteringGames(state);
      state.games = games;
      state.emptyAfterFiltered = !games.length;
      state.loading = false;
      state.currentPage = 1;
    },
    postGameReducer: (state, action) => {
      state.allGames.push(action.payload);
    }
  }
})

export default videogamesSlice.reducer;
export const { 
  getAllGamesReducer, 
  setLoadingReducer, 
  setCurrentPageReducer, 
  getDetailsReducer, 
  cleanUpDetailReducer,
  getGameByNameReducer,
  deepCleanUpReducer,
  setFiltersReducer,
  applyFiltersReducer,
  postGameReducer
} = videogamesSlice.actions;