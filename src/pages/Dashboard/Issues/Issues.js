import React, { useEffect, useRef, useState } from 'react'
import PieChart from '../../../components/ChartsD3/PieChart/PieChart'
import DataTable from '../../../components/DataTable/DataTable';
import MyPagination from '../../../components/myPagination/MyPagination';
import {getNumOfOpenClosedIssues, getRepoIssues } from '../../../requests/getRepoList/getRepoList';
import classes from './Issues.module.scss'

function Issues(props) {

  const [issuesGraphInfo, setIssuesGraphInfo] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPageNum, setLastPageNum] = useState(null);
  const [tableData, setTableData] = useState(null);

  const per_page = 30;
  
  useEffect(async () => {
    const queryClosed = `repo:${props.data.owner.login}/${props.data.name} type:issue state:closed`;
    let dataOfClosed = await getNumOfOpenClosedIssues(queryClosed);
    dataOfClosed = dataOfClosed.total_count;

    const queryOpen = `repo:${props.data.owner.login}/${props.data.name} type:issue state:open`;
    let dataOfOpen = await getNumOfOpenClosedIssues(queryOpen);
    dataOfOpen = dataOfOpen.total_count;

    setIssuesGraphInfo([
      {value: dataOfClosed, label: 'Closed Issues'},
      {value: dataOfOpen, label: 'Open Issues'},
    ])


  }, []);

  useEffect(async () => {
    const issuesData = await getRepoIssues(props.data.owner.login, props.data.name, {page: pageNum, per_page: per_page})
    if(!lastPageNum)
      setLastPageNum(issuesData.lastPage);

    let listOfIssues = [];
    listOfIssues = issuesData.filter(item => !item.pull_request);

    const stateFormat = listOfIssues.map((item) => {
      let date = new Date(item.updated_at);
      return [
        item.user.login, item.title, <a href={item.html_url}>Consultar</a> , `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      ]
    });

    console.table('stateFroma', stateFormat)
    setTableData(stateFormat)

  }, [pageNum]);

  const paginationHandler = (i) => {
    setPageNum(i)
  }


  return (
    <div className={classes.IssuesConatainer}>
      <div className={['', classes.mainContent].join(' ')}>
        {issuesGraphInfo &&
          <PieChart recivedData={issuesGraphInfo}/>
        }
        <span>
          <p className={classes.tableTitle}>Tabela de Issues</p>
          {tableData ?
            <DataTable head={['Autor', 'Titulo', 'Acesso em', 'Atualizado em']} data={tableData}/>
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
        </span>
      </div>
      
        {lastPageNum &&
          <MyPagination onChange={paginationHandler} range={[1  , lastPageNum]} actualPage={pageNum}/>
        }
    </div>
  )
}

export default Issues