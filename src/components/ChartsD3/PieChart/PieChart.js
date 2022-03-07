import { arc, format, interpolateCool, pie, scaleOrdinal, scaleSequential, select } from 'd3';
import React, { useRef } from 'react'

const height = 500;
const width = 500;

const outerRadius = 100;
const innerRadius = 0;

function PieChart({recivedData, ...props}) {

    const svgRef = useRef(null);

    const colorScale = scaleSequential()
        .interpolator(interpolateCool)
        .domain([0, recivedData.length])

    const createPie = pie()
      .value(d => d.value)
      .sort(null);

    const createArc = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const colors = scaleOrdinal(d3.schemeCategory10);
    const myFormat = format(".2f");

    const builtGraph = () => {
        const group = select(svgRef.current)
            .append('g')
            .attr("transform", `translate(${outerRadius} ${outerRadius})`)
        
        const outher = group
        .selectAll("g.arc")
        .data(recivedData)
        .enter();

        const innerGroup = outher
            .append("g")
            .attr("class", "arc");

        innerGroup.append("path")
            .attr("class", "arc")
            .attr("d", createArc)
            .attr("fill", (d, i) => colors(d.index));
        
        innerGroup.append("text")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", d => `translate(${createArc.centroid(d)})`)
            .style("fill", "white")
            .style("font-size", 10)
            .text(d => myFormat(d.value));
    }

    const drawGraph = () => {
        const group = select(this.ref.current)
        .select("g")
        .selectAll("g.arc")
        .data(recivedData);

        group.exit().remove();

        const groupWithUpdate = group
            .enter()
            .append("g")
            .attr("class", "arc");

        const path = groupWithUpdate.append("path").merge(group.select("path.arc"));

        path
            .attr("class", "arc")
            .attr("d", this.createArc)
            .attr("fill", (d, i) => this.colors(i));

        const text = groupWithUpdate.append("text").merge(group.select("text"));

        text
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", d => `translate(${createArc.centroid(d)})`)
            .text(d => myFormat(d.value));
    }


    useEffect(() => {
        select(svgRef.current)
            .attr('height', height)
            .attr('width', width)
        
        builtGraph();
       
    }, []);

    useEffect(() => {
        drawGraph();
    });


    return (
        <svg ref={svgRef}></svg>
    )
}

export default PieChart