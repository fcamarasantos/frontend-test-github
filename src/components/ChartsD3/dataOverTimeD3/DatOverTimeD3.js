import React from 'react'
import * as d3 from 'd3';
import './teste.scss';

function DatOverTimeD3({data, ...props}) {
    const width = 600,
      height = 350,
      margin = 20

    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
  
      const h = height - 2 * margin, w = width - 2 * margin
      
      let formatDate = d3.timeFormat("%b %Y")

      const x = d3.scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([0 + margin , width - 2* margin]);
   
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.quantity)]) 
        .range([h, margin])
   
      const xTicks = x.ticks(12).map(d=> (
        x(d) > 10 && x(d) < width ? 
            <g transform={`translate(${x(d)},${h + margin})`} key={`${d.quantity}${d.date}.${Date.now()}${Math.random()}`}>  
              <text>{formatDate(d)}</text> 
              <line x1='0' x1='0' y1='0' y2='5' transform="translate(0,-20)"/>
            </g>
          : null
      ))
      const yTicks = y.ticks(6).map(d => (
          y(d) > 10 && y(d) < h ? 
            <g transform={`translate(${margin},${y(d)})`} key={`${d.date}${Math.random()}${d.quantity}.${Date.now()}`}>  
              <text x="-12" y="5">{d}</text>
              <line x1='0' x1='5' y1='0' y2='0' transform="translate(-5,0)"/>
              <line className='gridline' x1='0' x1={w - margin} y1='0' y2='0' transform="translate(-5,0)"/> 
            </g>
          : null
      ))

      const line = d3.line()
        .x(d => { return x(new Date(d.date));})
        .y(d => { return y(d.quantity)})

      return  (
        <svg width={width} height={height} className='teste-graph'>
           <line className="axis" x1={margin} x2={w} y1={h} y2={h}/>
           <line className="axis" x1={margin} x2={margin} y1={margin} y2={h}/>
           <path d={line(data)}/>
           <g className="axis-labels">
             {xTicks}
           </g>
           <g className="axis-labels">
             {yTicks}
           </g>
        </svg>
      )
}

export default DatOverTimeD3;