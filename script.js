import * as d3 from "https://cdn.jsdelivr.net/npm/d3@5/+esm";

let baseTemp
let monthVar
let width = 1200
let height = 600
let padding = 100
let xScale
let yScale
const container = document.getElementById('visual-container')
const tooltip = d3.select('#tooltip')
let svg = d3.select(container)
    .append('svg')
    .attr('class', 'visual')

svg.append("text")
    .attr("id", "title")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width / 2}, ${padding / 2})`)
    .text("Monthly Global Land-Surface Temperature")

svg.append("text")
    .attr("id", "description")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width / 2}, ${padding / 1.25})`)
    .text("1753 - 2015: base temperature 8.66℃")

const drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

const generateScales = () => {
    let minYear = d3.min(monthVar, d => d['year'])
    let maxYear = d3.max(monthVar, d => d['year'])

    xScale = d3.scaleLinear()
        .range([padding, width - padding])
        .domain([minYear, maxYear + 1])

    yScale = d3.scaleTime()
        .range([padding, height - padding])
        .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
}

const drawCells = () => {
    svg.selectAll('rect')
        .data(monthVar)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('fill', (d) => {
            let variance = d['variance']
            if (variance <= -1) {
                return 'steelblue'
            } else if (variance <= 0) {
                return 'lightsteelblue'
            } else if (variance <= 1) {
                return 'orange'
            } else {
                return 'crimson'
            }
        })
        .attr('data-year', d => d['year'])
        .attr('data-month', d => d['month'] - 1)
        .attr('data-temp', d => d['variance'])
        .attr('height', temp => (height - (2 * padding)) / 12)
        .attr('y', d => yScale(new Date(0, d['month'] - 1, 0, 0, 0, 0, 0)))
        .attr('width', d => {
            let minYear = d3.min(monthVar, d => d['year'])
            let maxYear = d3.max(monthVar, d => d['year'])
            let yearCount = maxYear - minYear
            return (width - (2 * padding)) / yearCount
        })
        .attr('x', d => xScale(d['year']))
        .on('mouseover', (d) => {
            tooltip.transition()
                .style('visibility', 'visible')

            let monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]

            tooltip.text(d['year'] + ' ' + monthNames[d['month'] - 1] + ' : ' + d['variance'])
            tooltip.attr('data-year', d['year'])
        })
        .on('mouseout', (d) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })

}

const generateAxis = () => {
    let xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('d'))
    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
    let yAxis = d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat('%B'))
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
}

let req = new XMLHttpRequest();
let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
req.open('GET', url, true)
req.onload = () => {
    const data = JSON.parse(req.responseText)
    baseTemp = data.baseTemperature
    monthVar = data.monthlyVariance
    drawCanvas()
    generateScales()
    drawCells()
    generateAxis()
}
req.send()
