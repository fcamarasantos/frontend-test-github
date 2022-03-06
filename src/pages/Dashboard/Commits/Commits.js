import React, { useEffect, useState } from 'react'
import BarChart from '../../../components/ChartsD3/BarChart/BarChart';
import LineChart from '../../../components/ChartsD3/lineChart/LineChart';
import { getAllRepoCommits, getCommitList } from '../../../requests/getRepoList/getRepoList';
import './Commits.scss'

function Commits(props) {

  /* -- DATA SAMPLE
    [
      {y: 1, x: 'gustavo'},
      {y: 3, x: 'jose'},
      {y: 11, x: 'marcos'},
      {y: 6, x: 'antonio'},
      {y: 6, x: 'antonia'},
      {y: 6, x: 'antonie'},
    ]
  */

  const [ myData, setMyData ] = useState(
    null
  )

  const sortByValue = (a,b) => b.y -a.y ;

  useEffect(async () => {
    let authors = [];
    let allCommits = await getAllRepoCommits(props.data.owner.login, props.data.name);

    allCommits.forEach((commit) => {
      if(authors[commit.commit.author.name])
        authors[commit.commit.author.name] += 1;
      else
        authors[commit.commit.author.name] = 1;
    });

    // debugger


    let stateFormatAll = [];
    for(let i in authors){

      stateFormatAll.push({
        y: authors[i],
        x: i
      })
    }


    let stateFormat = stateFormatAll.sort(sortByValue).slice(0,10)
    setMyData(stateFormat)
    console.log(allCommits)

  }, []);

  
  const LineDummyData = [
    {x: new Date('2017-01-06T18:11:06Z'), y: 10},
    {x: new Date('2018-02-10T18:11:06Z'), y: 9},
    {x: new Date('2018-08-04T18:11:06Z'), y: 2},
    {x: new Date('2020-12-30T18:11:06Z'), y: 0},
    {x: new Date('2021-07-31T18:11:06Z'), y: 12},
  ];

  return (

    <div>
        {myData && 
          <BarChart recivedData={myData} axesLabels={{
            x: '',
            y: 'Quantidade de commits por contribuidor'
          }}/>
        }

        <LineChart dataRecived={LineDummyData}/>
      
    </div>

    
  )
}

export default Commits