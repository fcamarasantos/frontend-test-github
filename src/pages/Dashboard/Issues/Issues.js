import React, { useEffect, useState } from 'react'
import PieChart from '../../../components/ChartsD3/PieChart/PieChart'
import { getAllRepoIssues, getNumOfOpenClosedIssues } from '../../../requests/getRepoList/getRepoList';
import './Issues.scss'

function Issues(props) {

  const [issuesGraphInfo, setIssuesGraphInfo] = useState(null);


  const data = [
    {value: 15, index: 1, label: 'aaaa'},
    {value: 15, index: 2, label: 'bbbbbb'},
    {value: 15, index: 3, label: 'ccccccc'},
  ];
  
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

    console.log(
      [
        {value: dataOfClosed, label: 'Closed Issues'},
        {value: dataOfOpen, label: 'Open Issues'},
      ]
    )
    
  }, []);


  return (
    <div>

      {issuesGraphInfo &&
        <PieChart recivedData={issuesGraphInfo}/>
      }

    </div>
  )
}

export default Issues