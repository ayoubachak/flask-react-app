import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import DataPoint from '../types/DataPoint';



interface RealTimeChartProps {
  dataGenerator: () => Generator<DataPoint | null, DataPoint, unknown>;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ dataGenerator, title, xAxisLabel, yAxisLabel }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const n = 40;
  const width = 600;
  const height= 300;
  const [data, setData] = useState<DataPoint[]>([]);

  const clearGraph = () => {
    // Clear the graph by resetting the data
    setData([]);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const width = 600;
    const height = 300;
    const margin = { top: 30, right: 50, bottom: 50, left: 60 };
    const transitionDuration = 500; // Duration of the x-axis transition

    const x = d3
      .scaleTime()
      .domain([(new Date() as any) - n * 1000, new Date() as any])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.time))
      .y((d) => y(d.value))
      .curve(d3.curveBasis);;

    const path = svg
      .append('g')
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Horizontal line for hover effect
    const hoverLine = svg
      .append('line')
      .attr('class', 'hover-line')
      .style('stroke', 'red')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '3, 3')
      .style('opacity', 0);

    // Hovered value display
    const hoverText = svg
      .append('text')
      .attr('class', 'hover-text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('opacity', 0);

    // X-axis label
    svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height - margin.bottom / 10)  // Adjust the position to move it up
    .attr('text-anchor', 'middle')
    .text(xAxisLabel)
    .style('fill', 'white')
    .style('font-weight', 'bold');
    // Y-axis label
    svg
      .append('text')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text(yAxisLabel)
      .style('fill', 'white')
      .style('font-weight', 'bold');
      // set the title 
      svg
        .append('text')
        .attr('x', width / 2)  // Center the title horizontally
        .attr('y', margin.top / 2)  // Move the title up slightly
        .attr('text-anchor', 'middle')
        .text(title)
        .style('fill', 'white')
        .style('font-weight', 'bold');

    // X-axis ticks
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Y-axis ticks and labels
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickSizeInner(-width + margin.left + margin.right))
      .selectAll('text')
      .style('fill', 'white')
      .style('font-weight', 'bold');

    svg
      .on('mousemove', (event) => {
        const [xPos] = d3.pointer(event);
        const invertedX = x.invert(xPos);
        const nearestPoint = findNearestPoint(invertedX);
        if (nearestPoint) {
          const [xPos, yPos] = [x(nearestPoint.time), y(nearestPoint.value)];
          hoverLine
            .attr('x1', xPos)
            .attr('x2', xPos)
            .attr('y1', margin.top)
            .attr('y2', height - margin.bottom)
            .style('opacity', 1);

          hoverText
            .attr('x', xPos)
            .attr('y', yPos - 10)
            .text(`Value: ${nearestPoint.value.toFixed(2)}`)
            .style('opacity', 1);
        } else {
          hoverLine.style('opacity', 0);
          hoverText.style('opacity', 0);
        }
      });

    function findNearestPoint(xValue: Date) {
      return data.find((d) => Math.abs(+d.time - +xValue) < 1000);
    }

    
      

    const dataIterator = dataGenerator();

    function tick() {
      // Add a new data point.
      const nextData = dataIterator.next().value;
      if (nextData !== null) {
        data.push(nextData);

        // Redraw the line.
        path.attr('d', line);

        // Update the x-domain to include the entire data range
        const currentXDomain = [data[0].time, data[data.length - 1].time];
        x.domain(currentXDomain);

        // Remove the oldest data point from the dataset.
        if (data.length > n) {
          data.shift();
        }

        // Slide x-axis left.
        svg
          .select<SVGGElement>('.x-axis')
          .transition()
          .duration(transitionDuration)
          .ease(d3.easeLinear)
          .call(d3.axisBottom(x));
      }

      // Schedule the next tick.
      setTimeout(tick, transitionDuration);
    }

    // Call tick() once to set the initial x-domain
    tick();
  }, [dataGenerator, xAxisLabel, yAxisLabel, title]);

  

  return <>

  <svg ref={svgRef} width={width} height={height}></svg>
  {/* <button onClick={clearGraph}>Clear Graph</button> */}

  </>
};

export default RealTimeChart;
