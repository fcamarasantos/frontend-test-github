import './App.css';
import M from 'materialize-css';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes, useParams, } from 'react-router-dom';
import SearchRepos from './pages/SearchRepos/SearchRepos';
import Commits from './pages/Dashboard/Commits/Commits';
import PullRequests from './pages/Dashboard/PullRequests/PullRequests';
import Issues from './pages/Dashboard/Issues/Issues';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  useEffect(() => {
    M.AutoInit();
  });

  let urlParams = useParams();
  

  return (
    <div className="App">
      <BrowserRouter>
        <Header sidebarTriggerID='slide-out'></Header>

        <Routes>
          <Route index path='/' element={<SearchRepos />} />
          <Route exact path='/Dashboard/:id/*' element={<Dashboard />} />
          <Route path='/Dashboard'>
            <Route path='search' element={<SearchRepos  />} />
            <Route path='commits' element={<Commits id={urlParams.id}/>} />
            <Route path='pullRequests' element={<PullRequests />} />
            <Route path='issues' element={<Issues />} />
          </Route>
          {/* <Route path="*" element={<SearchRepos />} /> */}
        </Routes>
        {/* <Sidebar triggerID={'slide-out'}/>
        <Routes>
          <Route path='/search' element={<SearchRepos />} />
          <Route path='/commits' element={<Commits />} />
          <Route path='/pullRequests' element={<PullRequests />} />
          <Route path='/issues' element={<Issues />} />
        </Routes> */}

      </BrowserRouter>
    </div>
  );
}

export default App;
