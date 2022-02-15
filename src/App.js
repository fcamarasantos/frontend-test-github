import './App.css';
import M from 'materialize-css';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchRepos from './pages/SearchRepos/SearchRepos';
import Commits from './pages/Commits/Commits';

function App() {

  useEffect(() => {
    M.AutoInit();
  });
  

  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>

        <Sidebar triggerID={'slide-out'}/>
        <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>

        <Routes>
          <Route path='/search' element={<SearchRepos />} />
          <Route path='/commits' element={<Commits />} />
          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
