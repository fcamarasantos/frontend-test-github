import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/DataTable/DataTable';
import MyPagination from '../../../components/myPagination/MyPagination';
import { getCommitList } from '../../../requests/getRepoList/getRepoList';
import classes from './Home.module.scss'

function Home(props) {

    const [commitsData, setCommitsData] = useState(null); 
    const [actualPage, setActualPage] = useState(1);
    const [lastPageNum, setLastPageNum] = useState(null);

    const requestCommits =async () => {
        let commitsResp = await getCommitList(props.data.owner.login, props.data.name, {per_page: 50, page: actualPage}); 

        let stateFormat = commitsResp.map(item => {
            let date =  new Date(item.commit.author.date);
            let message = item.commit.message
            message = message.length > 50 ? message.slice(0,50) + ' ...' : message
            return [
                item.commit.author.name,
                message,
                <a href={item.html_url}>Consultar</a>,
                `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            ]
        });
        setCommitsData(stateFormat);
        setLastPageNum(commitsResp.lastPage);
    }

    useEffect(async () => {
        requestCommits();
    },[]);

    useEffect(async () => {
        requestCommits();
    }, [actualPage]);

  return (
    <div className={classes.HomeContainer}>
        <p className={classes.tableTitle}>Tabela de commits</p>
        {commitsData ?
          <DataTable head={['Autor', 'Descrição', 'Acesso em', 'Atualizado em']} data={commitsData}/>
          :
  
          (<div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>)
        }
        
      {lastPageNum &&
        <MyPagination range={[1, lastPageNum]} actualPage={actualPage} onChange={setActualPage}/>
      }
    </div>
  )
}

export default Home