import { extent } from 'd3';
import React, { useEffect, useState } from 'react'
import BarChart from '../../../components/ChartsD3/BarChart/BarChart';
import LineChart from '../../../components/ChartsD3/lineChart/LineChart';
import { getAllRepoCommits, getCommitList } from '../../../requests/getRepoList/getRepoList';
import classes from './Commits.module.scss'

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

  const [frequncyProcessedData, setFrequncyProcessedData] = useState(null);

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

  const handleTimeRange = (realData) => {
    // new Date(new Date('2021-01-06T18:11:06Z').getTime() - new Date('2020-11-31T18:11:06Z').getTime()) /  (1000 * 3600 * 24)
    const quantityOfSlots = 7;
    let range = extent(realData.map(item => item.x))
    let diferenceOfDays = new Date(new Date(range[range.length - 1]).getTime() - new Date(range[0]).getTime()) /  (1000 * 3600 * 24)
    let processedData = [];
    let newDates = [];
    for(let i = 0; i < quantityOfSlots; i++){
      newDates.push(
        new Date(new Date(range[0] ).getTime() + new Date(+ i*diferenceOfDays * (1000 * 3600 * 24)/quantityOfSlots).getTime()) ,
      )
    }

    for(let i = 0; i < realData.length; i++){
      let bestApproach = null;
      let bestDiference = null
      for(let c = 0; c < newDates.length; c++){
        if(c == 0) { // se for a primeira vez, guarda algo para efetuar comparacao
          bestDiference = Math.abs(new Date(realData[i].x).getTime() - new Date(newDates[c]).getTime())
          bestApproach = new Date(newDates[c])
        }
        else{
          if(bestDiference > Math.abs(new Date(realData[i].x).getTime() - new Date(newDates[c]).getTime())){
            bestDiference = Math.abs(new Date(realData[i].x).getTime() - new Date(newDates[c]).getTime());
            bestApproach = new Date(newDates[c])
          }
         
        }
      
      }

      let existisIn = null;
      for(let j = 0; j < processedData.length; j++){
        if(new Date(processedData[j].x).getTime() == new Date(bestApproach).getTime()){
          existisIn = j;
          console.log(j)
        }
        // debugger
      }

      if(existisIn){
        processedData[existisIn] = {
          ...processedData[existisIn],
          y: processedData[existisIn].y += realData[i].y
        };
      }
      else{
        processedData.push({
          x: bestApproach,
          y: realData[i].y
        });
      }

      
    }

    console.groupCollapsed('dates')
    // console.table(newDates)
    // console.table(realData)
    console.table(processedData)
    console.groupEnd('dates')

    setFrequncyProcessedData(processedData)

  }

  
  const LineDummyData = [
    {x: new Date('2021-01-01T18:11:06Z'), y: 1},

    {x: new Date('2021-02-06T18:11:06Z'), y: 1},
    {x: new Date('2021-03-06T18:11:06Z'), y: 1},

    {x: new Date('2021-04-30T18:11:06Z'), y: 1},
    {x: new Date('2021-05-20T18:11:06Z'), y: 1},
    {x: new Date('2021-05-21T18:11:06Z'), y: 1},
    {x: new Date('2021-05-22T18:11:06Z'), y: 1},
    {x: new Date('2021-05-23T18:11:06Z'), y: 1},

    {x: new Date('2021-06-31T18:11:06Z'), y: 1},
    {x: new Date('2021-07-31T18:11:06Z'), y: 1},
    {x: new Date('2021-07-01T18:11:06Z'), y: 1},
    {x: new Date('2021-07-02T18:11:06Z'), y: 1},
    {x: new Date('2021-07-03T18:11:06Z'), y: 1},
    {x: new Date('2021-07-04T18:11:06Z'), y: 1},
    {x: new Date('2021-07-05T18:11:06Z'), y: 1},
    {x: new Date('2021-07-06T18:11:06Z'), y: 1},

    {x: new Date('2021-08-31T18:11:06Z'), y: 1},
    {x: new Date('2021-09-31T18:11:06Z'), y: 1},

    {x: new Date('2021-10-31T18:11:06Z'), y: 1},
    {x: new Date('2021-11-31T18:11:06Z'), y: 1},

    {x: new Date('2021-12-31T18:11:06Z'), y: 1},
    {x: new Date('2022-01-31T18:11:06Z'), y: 1},
    {x: new Date('2022-02-31T18:11:06Z'), y: 1},
  ];



  useEffect(() => {
    handleTimeRange(LineDummyData)
  }, [])

  return (

    <div className={classes.lineChart}>
        {myData && 
          <BarChart recivedData={myData} axesLabels={{
            x: '',
            y: 'Quantidade de commits por contribuidor'
          }}/>
        }

        {frequncyProcessedData && 
          <LineChart className={classes.lineChart} dataRecived={frequncyProcessedData}/>
        }
      
    </div>

    
  )
}

export default Commits