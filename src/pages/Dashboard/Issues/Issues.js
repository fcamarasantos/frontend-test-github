import React, { useEffect, useState } from 'react'
import PieChart from '../../../components/ChartsD3/PieChart/PieChart'
import DataTable from '../../../components/DataTable/DataTable';
import MyPagination from '../../../components/myPagination/MyPagination';
import {getNumOfOpenClosedIssues, getRepoIssues } from '../../../requests/getRepoList/getRepoList';
import classes from './Issues.module.scss'

function Issues(props) {

  const [issuesGraphInfo, setIssuesGraphInfo] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [tableData, setTableData] = useState(null);


  // const data = [
  //   {value: 15, index: 1, label: 'aaaa'},
  //   {value: 15, index: 2, label: 'bbbbbb'},
  //   {value: 15, index: 3, label: 'ccccccc'},
  // ];
  
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
    const issuesData = await getRepoIssues(props.data.owner.login, props.data.name, {page: pageNum, per_page: 30})

    let listOfIssues = [];
    listOfIssues = issuesData.filter(item => !item.pull_request);

    console.log(listOfIssues)

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
    console.log(i)
    setPageNum(i)
  }


  return (
    <div className={classes.IssuesConatainer}>
      <div className={['', classes.mainContent].join(' ')}>
        {issuesGraphInfo &&
          <PieChart recivedData={issuesGraphInfo}/>
        }

        {tableData &&
          <DataTable head={['Autor', 'Titulo', 'Acesso em', 'Atualizado em']} data={tableData}/>
        
        }
      </div>
      

      <MyPagination onChange={paginationHandler} range={[1,5]} actualPage={1}/>
    </div>
  )
}

export default Issues