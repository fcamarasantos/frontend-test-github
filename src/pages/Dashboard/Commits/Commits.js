import React, { useEffect, useState } from 'react'
import DatOverTimeD3 from '../../../components/ChartsD3/dataOverTimeD3/DatOverTimeD3';
import LineChart from '../../../components/ChartsD3/dataOverTimeD3/Real';
import Teste from '../../../components/ChartsD3/dataOverTimeD3/teste';
import { getCommitList } from '../../../requests/getRepoList/getRepoList';
import './Commits.scss'

function Commits(props) {

  const [commitsOverTime, setCommitsOverTime] = useState([]);
  const [commitsQquantity, setCommitsQquantity] = useState([]);
  const [lineChartData, setLineChartData] = useState();

  console.log(props.data)
  console.log()

  let commitsHistory = {};

  useEffect(async () => {
    let commitsResp = await getCommitList(props.data.owner.login, props.data.name);
    setCommitsQquantity(commitsResp);
    console.log(commitsResp)

  
    let commitsDate = commitsResp.map((item) => {
      let commitDate = new Date(item.commit.author.date)
      commitDate.setDate(1);
      return commitDate;

    });

  }, []);

  const data = [
    {quantity:10, date: new Date('1980-01-10T22:51:57Z')},
    {quantity:9, date: new Date('1980-02-11T22:51:57Z')},
    {quantity:1, date: new Date('1980-03-11T22:51:57Z')},
    {quantity:8, date: new Date('1980-04-11T22:51:57Z')},
    {quantity:8, date: new Date('1980-05-11T22:51:57Z')},
    {quantity:3, date: new Date('1980-06-11T22:51:57Z')},
    {quantity:4, date: new Date('1980-08-11T22:51:57Z')},
    {quantity: 1, date: new Date('1980-10-11T22:51:57Z')}

  ]

  return (

    <div>
      <div className='container'>
        {data.length > 0 ? 
          <DatOverTimeD3 
              data={data}
          /> : null
        }
      </div>

      

      
    </div>

    
  )
}

export default Commits