import { axisBottom, axisLeft, curveMonotoneX, extent, line, max, scaleBand, scaleLinear, scaleTime, select, timeFormat } from 'd3';

import React, { useEffect, useRef } from 'react'
// import { dateFormat } from '../d3Config';

function LineChart({dataRecived, ...props}) {
    const width = 500;
    const height = 500;
    const outherSpace = 70;
    const innerHeight = height - (2*outherSpace) ;

    const svgRef = useRef(null);

    const dates = dataRecived.map(item => new Date(item.x))
    console.log(dataRecived)

    const Xscale = scaleTime()
        .domain(extent(dataRecived, (d) => { return new Date(d.x); }))
        .range([0, width]);
    

    const Yscale = scaleLinear()
        .domain([0, max(dataRecived, (d) => { return d.y; })])
        .range([innerHeight, 0 ]);

    const yAxis = axisLeft(Yscale)
        .ticks(5)
        .tickFormat(y => `${y.toFixed(1)}`)

    const xAxis = axisBottom(Xscale)
        .ticks(5)
        .tickFormat(timeFormat("%b %Y"))


    const scaleXData = (point) => {
        console.log(new Date(point.x))
        return Xscale(new Date(point.x));
    }
        
    const scaleYData = (point) => {
        console.log(point)
        return Yscale(point.y);
    }
   
    const buildAxes = () => {
        console.log('BUILT-ACCES')
        select(svgRef.current)
            .append('g')
            .attr('class', 'line-chart-yaxis');
        
        select(svgRef.current)
            .append('g')
            .attr('class', 'line-chart-xaxis')
    };

    const buildLine = () => {
        select(svgRef.current)
          .append('path')
          .attr('class', 'line-chart-line')
      };

    const drawAxes = () => {
        console.log('DRAW-AXES')
        select(svgRef.current)
        .select('.line-chart-xaxis')
            .call(xAxis);
        
        select(svgRef.current)
            .select('.line-chart-yaxis')
            .call(yAxis);
    }
    
    const drawLine = (data) => {
        const myLine = line()
            .x(scaleXData)
            .y(scaleYData)
            .curve(curveMonotoneX);
        
        select(svgRef.current)
            .select('.line-chart-line')
            .attr('fill', 'none')
            .attr('stroke', '#00abd6')
            .attr('d', myLine(data));
    }

    const renderChanges = (data) => {
        drawAxes();
        drawLine(data);
    }

    useEffect(() => {
        select(svgRef.current)
            .attr('width', width)
            .attr('height', height)

        buildAxes();
        buildLine();
        renderChanges(dataRecived);
    }, []);

    return (
        <svg ref={svgRef}></svg>
    )
}

export default LineChart