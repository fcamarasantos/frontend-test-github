import { arc, format, interpolateCool, pie, scaleOrdinal, scaleSequential, schemeCategory10, select, selectAll } from 'd3';
import React, { useRef, useEffect } from 'react'

import './PieChart.scss';

function PieChart({recivedData, ...props}) {
  const outerRadius = 100;
  const innerRadius = 10;

    const height = 200;
    const width = 200;

    const svgRef = useRef(null);
  
      const colorScale = scaleOrdinal()
      .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      useEffect(() => {
        drawChart();
      });
    
      function drawChart() {
        const svg = select(svgRef.current)
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
        const arcGenerator = arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
    
        const pieGenerator = pie()
          .padAngle(0)
          .value((d) => d.value);
    
        const myArc = svg.selectAll()
          .data(pieGenerator(recivedData))
          .enter();
    
        // Append arcs
        myArc
          .append('path')
          .attr('d', arcGenerator)
          .style('fill', (_, i) => colorScale(i))
          .style('stroke', '#ffffff')
          .style('stroke-width', 0);
    
        // Append text labels
        myArc
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'middle')
          .attr('class', 'pie-char-label-text')
          .text((d) => d.data.label)
          .style('fill', (_, i) => '#000')
          .attr('transform', (d) => {
            const [x, y] = arcGenerator.centroid(d);
            return `translate(${x}, ${y})`;
          });
    }
    return (
        <svg ref={svgRef}></svg>
    )
}

export default PieChart