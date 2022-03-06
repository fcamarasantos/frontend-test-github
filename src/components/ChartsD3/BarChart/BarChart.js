/*
    receber os dados e retornar o componente com o gráfico.
    modelo de dados:
    let exemplo = [
        {y: 20, x: 10},
        {y: 20, x: 10},
        {y: 20, x: 10},
        {y: 20, x: 10},
    ]

    nomeador = {
        x : 'nome da pessoa',
        y : nota
    }

    
    const dataFormatExample =  [
        {y: 1, x: 'gustavo'},
        {y: 3, x: 'jose'},
        {y: 11, x: 'marcos'},
        {y: 6, x: 'antonio'},
    ];
*/

import React, { useEffect, useRef } from 'react'
import './BarChart.scss'

import * as d3 from 'd3';

function BarChart({recivedData, axesLabels, ...props}) {
    const height = 400;
    const width = 500;
    const outherSpace = 70;
    const innerHeight = height - 2*outherSpace;

    const svgRef = useRef(null);

    const MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 40
      }

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", width )
            .attr("height", height)
        
            builtAll();
    }, []);

    const builtAll = () => {
        /* Constroi todoas as estururas do svg e define seus posicionamentos */
        const svg = d3.select(svgRef.current)
        

        svg.append('g')
            .attr('class', 'outherGraph')
            .attr('transform', `translate(0, 0)`)
            .append('g')
                .attr('class', 'innerGraph')
                .attr('height', innerHeight)
                .attr('transform', `translate(${MARGINS.left }, ${outherSpace})`)


        const outherGraph = d3.select('.outherGraph')
        const innerGraph = d3.select('.innerGraph')

        buildAxes(innerGraph);
        builtBars(innerGraph)
        drawLabels(outherGraph);
    }

    const x = d3 // escala X
        .scaleBand()
        .domain(recivedData.map((data) => data.x))
        .rangeRound([0, width - MARGINS.left])
        .padding(0.1);  

    const y = d3 // escala Y
        .scaleLinear()
        .domain([0, d3.max(recivedData, (data) => data.y)])
        .rangeRound([innerHeight, 0]);

    const yAxis = // Eixo vertical imaginario baseado na escala Y
        d3.axisLeft(y)
        .ticks(5)
        .tickFormat(y => `${y.toFixed(1)}`);
    
    const xAxis =// Eixo Horizontal imaginario baseado na escala X
        d3.axisBottom(x)
        .ticks(5)
        .tickFormat(x => `${x}`);

    const buildAxes = (builtin) => { // constroi os eixos da DOM, recebe um elemento (svg) para constrir dentro dele (builtin)
        builtin
            .append('g')
            .attr('transform', `translate(0, 0)`)
            .attr('class', 'line-chart-yaxis')
           

        builtin
            .append('g')
            .attr('class', 'line-chart-xaxis')
            .attr("transform", `translate(0,${(innerHeight)})`)
        };


    const builtBars = (builtin) => { // constoi a estutura das barras
        builtin.append('g')
            .attr('class', 'bars')
            .attr("transform", `translate(0,${(0)})`)
    }

    const drawAxes = () => { // desenha os exixos em suas estruturas que ja foram criadas, basedos nos eixos imaginarios
        d3.select(svgRef.current)
            .select('.line-chart-xaxis')
            .call(xAxis);
        
        d3.select(svgRef.current)
            .select('.line-chart-yaxis')
            .call(yAxis);
    }

    const drawLabels = (builtin) => { // desenha e aplica na DOM as legendas de cada eixo
        builtin
            .append('text')
            .text(`${axesLabels.x}`)
            .attr('y', height - outherSpace /2)
            .attr('style', `transform: translate(45%, 0)`)

        builtin
            .append('text')
            .text(`${axesLabels.y}`)
            .attr('y', outherSpace - 30)
            .attr('style', `transform: translate(0, 0)`)
    }
          

    const draw = () => { // responsavel por (re)desenhar os dados em suas estruturas
        const svg = d3.select(svgRef.current);
        let selection = svg // local onde sao colocados as barras
            .select('.bars')
            .selectAll("rect")
            .data(recivedData);
       
        drawAxes();
        
        selection // atualiza os dados para todos os rects
            .transition().duration(300)
                .attr('height', (data) => innerHeight - y( data.y))
                .attr('y', (data => y( data.y)))

        selection // inclui os rects necessarios
            .enter()
            .append("rect")
            .attr('width', x.bandwidth())
            .attr('height', (data) => innerHeight - y( data.y))
            .attr('x', (data => x(data.x) ))
            .attr('y', (data => y( data.y)))
            .attr('teste', (data => data.y))
               
        selection // retira os rects desnecessarios
            .exit()
            .transition().duration(300)
                .attr("y", (d) => innerHeight)
                .attr("height", 0)
            .remove()
    }

    useEffect(() => {
        draw();
    });

  return (
    <svg ref={svgRef} className='barChartConatiner' ></svg>
  )
}

export default BarChart