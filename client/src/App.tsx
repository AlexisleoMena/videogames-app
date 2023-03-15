import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import CreateGame from './components/CreateGame/CreateGame';
import Details from './components/Details/Details';
import Home from './components/Home/Home';
import Landing from './components/Landig/Landing';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path='/home/create' element={<CreateGame/>} />
      </Routes>
    </Router>
  );
}

export default App;
