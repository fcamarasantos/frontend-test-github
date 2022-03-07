import { axisBottom, axisLeft, curveMonotoneX, extent, line, max, scaleBand, scaleLinear, scaleTime, select, timeFormat } from 'd3';

import React, { useEffect, useRef } from 'react'
// import { dateFormat } from '../d3Config';

function LineChart({dataRecived, ...props}) {
    const width = 800;
    const height = 500;
    const outherSpace = 70;
    const innerHeight = height - (2*outherSpace) ;

    const svgRef = useRef(null);

    const dates = dataRecived.map(item => new Date(item.x))
   
    const Xscale = scaleTime()
        .domain(extent(dataRecived.map(item => new Date(item.x))))
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
        return Xscale(new Date(point.x));
    }
        
    const scaleYData = (point) => {
        return Yscale(point.y);
    }
   
    const buildAxes = (place) => {
        place
            .append('g')
            .attr('class', 'line-chart-yaxis');
        
        place
            .append('g')
            .attr('class', 'line-chart-xaxis')
            .attr('transform', `translate(${0}, ${innerHeight})`)
    };

    const buildLine = (place) => {
        place
          .append('path')
          .attr('class', 'line-chart-line')
      };

    const drawAxes = () => {
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

    const builtAll = () => {
        select(svgRef.current)
        .append('g')
            .attr('class', 'outher-built')
        .append('g')
            .attr('class', 'inner-built')
            .attr('transform', `translate(${outherSpace}, ${0})`)
        

        const outherBuilt = select(svgRef.current)
            .select('.outher-built');
        const innerBuilt = outherBuilt.select('.inner-built')

        buildAxes(innerBuilt);
        buildLine(innerBuilt);
    }

    useEffect(() => {
        select(svgRef.current)
            .attr('width', width + 2 * outherSpace)
            .attr('height', height)

        builtAll()
        renderChanges(dataRecived);
    }, []);

    return (
        <svg ref={svgRef}></svg>
    )
}

export default LineChart