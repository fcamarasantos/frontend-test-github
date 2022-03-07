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

  const sortByDate = (a,b) => {
    return new Date(b.x).getTime() - new Date(a.x).getTime();
  }

  useEffect(async () => {
    let authors = [];
    let allCommits = await getAllRepoCommits(props.data.owner.login, props.data.name);

    let commitDate = [];
    for(let i = 0; i < allCommits.length; i++){
      let item = allCommits[i]
      commitDate.push({
        x: new Date(item.commit.author.date), 
        y: 1
      })

    }

    commitDate.sort(sortByDate);  
    commitDate.push({
      x: new Date(new Date(commitDate[commitDate.length - 1].x).getTime() - (1000 * 3600 * 24 * 7)),
      y: 0
    })

    

    handleTimeRange(commitDate)

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


  }, []);

  const handleTimeRange = (realData) => {
    /* 
      Funcao responsavel por receber dados no seguinte formato:
      [
        {x: new Date('2021-01-01T18:11:06Z'), y: 1},
        {x: new Date('2021-02-06T18:11:06Z'), y: 1},
        .
        .
        .
      ]

      e inserir no estado os mesmos dados no seguinte formato:
      [
          {
              "x": "2021-01-01T18:11:06.000Z",
              "y": 1
          },
          {
              "x": "2021-03-03T14:45:23.142Z",
              "y": 2
          },
          .
          .
          .
      ]

      O objetivo é distribuir as datas dos commits em datas relativas 
      e inserir a quantidade de datas reais que se aproximam das datas relativas no grph
    */
    const quantityOfSlots = 130; // define a precisao de quantos pontos de dados existirao, os dados reais serao inseridos nesses slots (o mais proximo deles)
    let range = extent(realData.map(item => item.x))
    let diferenceOfDays = new Date(new Date(range[range.length - 1]).getTime() - new Date(range[0]).getTime()) /  (1000 * 3600 * 24) // define o range total de dias 
    let newDateSlots = []; // aqui serao preenchidos os dados

    for(let i = 0; i < quantityOfSlots; i++){
      // para cada slot, insira uma data que corresponda a sua posicao no array + a quantidade de tempo/dias que foi definido em cima da precisao
      newDateSlots.push({
          x: new Date(new Date(range[0] ).getTime() + new Date(+ i*diferenceOfDays * (1000 * 3600 * 24)/quantityOfSlots).getTime()),
          y: 0
        });
    }

    for(let i = 0; i < realData.length; i++){ // encontrar qual é a data virtual mais proxima a data real
      let bestDiference = null;
      let thisPostion = null;
    
      for(let c = 0; c < newDateSlots.length; c++){
        if(c == 0) { // se for a primeira vez, guarda algo para efetuar comparacao
          bestDiference = Math.abs(new Date(realData[i].x).getTime() - new Date(newDateSlots[c].x).getTime())
          thisPostion = c;
        }
        else{
          if(bestDiference > Math.abs(new Date(realData[i].x).getTime() - new Date(newDateSlots[c].x).getTime())){
            bestDiference = Math.abs(new Date(realData[i].x).getTime() - new Date(newDateSlots[c].x).getTime());
            thisPostion = c;
          }
         
        }
      
      }

      if(!thisPostion) continue;
      newDateSlots[thisPostion] = { // insere na posicao que ele melhor encontrou, a data real
        ...newDateSlots[thisPostion],
        y: newDateSlots[thisPostion].y += realData[i].y
      };
    }

    // console.table(newDateSlots)

    setFrequncyProcessedData(newDateSlots)

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
    // handleTimeRange(LineDummyData)
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