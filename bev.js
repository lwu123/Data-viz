(function (d3) {
    'use strict';
  
    const svg = d3.select('svg');
  
    const width = +svg.attr('width');
    const height = +svg.attr('height');
  
    const render = data => {
      const title = 'BEV Vehicle Sales Over the Years';
      
      const xValue = d => d.calendar_year;
      const xAxisLabel = 'Year';
      
      const yValue = d => d.bev;
      const yAxisLabel = 'BEV Vehicle Sales(Thousands)';
      
      const margin = { top: 60, right: 40, bottom: 88, left: 105 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
      
      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 20])
        .nice();
      
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
      const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickFormat(d3.format("d"))
        .tickPadding(15);
        
      
      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
      
      const yAxisG = g.append('g').call(yAxis);
      yAxisG.selectAll('.domain').remove();


      
      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', -60)
          .attr('x', -innerHeight / 2)
          .attr('fill', 'black')
          .attr('transform', `rotate(-90)`)
          .attr('text-anchor', 'middle')
          .text(yAxisLabel);
      
      const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      
      xAxisG.select('.domain').remove();
      
      xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', 80)
          .attr('x', innerWidth / 2)
          .attr('fill', 'black')
          .text(xAxisLabel);
      
      const lineGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);
      
      g.append('path')
          .attr('class', 'line-path')
          .attr('d', lineGenerator(data));
      
      g.append('text')
          .attr('class', 'title')
          .attr('y', -10)
          .text(title);
    };

    const type = d3.annotationLabel

      const annotations = [
        {
          note: { label: "BEVs saw a rapid growth starting 2012." },
          x: 700,
          y: 350,
          dy: 300,
          dx: 300,
          subject: { radius: 20, radiusPadding: 5 },
      //can use x, y directly instead of data
      data: { date: "18-Sep-09", close: 185.02 },
      className: "show-bg",
      dy: -60,
      dx: -35
    },

    ]
      
      //Skipping setting domains for sake of example
      const x = d3.scaleTime().range([50, 200])
      const y = d3.scaleLinear().range([150, 0])
      
      const makeAnnotations = d3.annotation()
        .editMode(true)
        //also can set and override in the note.padding property
        //of the annotation object
        .notePadding(15)
        .type(type)
        //accessors & accessorsInverse not needed
        //if using x, y in annotations JSON
        .annotations(annotations)
      
      d3.select("svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)
  
    d3.csv('https://gist.githubusercontent.com/lwu123/491c0b3efdc493c2252b703793cb206d/raw/carsales.csv')
      .then(data => {
        console.log(data);
        data.forEach(d => {
          d.calendar_year = +d.calendar_year;
          d.bev = +d.bev;
        });
        render(data);
      });
  
  }(d3));