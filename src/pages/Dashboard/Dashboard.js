import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useParams, useNavigate  } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import SearchRepos from '../SearchRepos/SearchRepos'
import Commits from './Commits/Commits'
import Home from './Home/Home'
import Issues from './Issues/Issues'
import PullRequests from './PullRequests/PullRequests'
import classes from './Dashboard.module.scss';

function Dashboard() {
    const location = useLocation()
    const [queryData, setQueryData] = useState(null);
    const [content, setContent] = useState(<div></div>);
    const navigate = useNavigate();

    useEffect(() => {
      if(!location.state) {
        navigate('/')
        return;
      };

      const { item } = location.state;

      setQueryData(() => {
        setContent(<Home data={item}></Home>);
        return item;
      })
    }, []);

    const tabs = [
      
      { 
        title: 'Home', 
        component: <Home data={queryData}/>, 
        icon: 'house'
      },
      { 
        title: 'Commits', 
        component: <Commits abacaxi={'oi'} data={queryData}/>, 
        icon: 'format_list_bulleted'
      },
      {
        title: 'Issues', 
        component: <Issues data={queryData}/>, 
        icon: 'error'
      },
      {
        title: 'Pull Requests', 
        component: <PullRequests data={queryData}/>, 
        icon: 'move_to_inbox'
      },
    ];

 

    const navItemClicked = (item) => {
      setContent(item.component)
    }

  return (
    <div className={classes.container}>
        <Sidebar triggerID={'slide-out'} tabs={tabs} navItemClicked={navItemClicked}/>
        {queryData && (
          <header className='container'>
            <h1 className={classes.repositioryName}>Repositório: {queryData.name}</h1>
            <p className={classes.ownerName}>Proprietário: {queryData.owner.login}</p>
          </header>
        )}
        <main>
          {content}
        </main>
    </div>
  )
}

export default Dashboard