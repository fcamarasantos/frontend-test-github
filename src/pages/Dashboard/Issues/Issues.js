import React from 'react'
import PieChart from '../../../components/ChartsD3/PieChart/PieChart'
import './Issues.scss'

function Issues() {
  const data = [
    {value: 5, index: 1},
    {value: 15, index: 2},
    {value: 8, index: 3},
    {value: 7, index: 4},
    {value: 3, index: 5},
  ];


  return (
    <div>

      <PieChart recivedData={data}/>

    </div>
  )
}

export default Issues