import React, { Component } from 'react'
import Chart from "chart.js";

// Declare myLineChart and set chart default settings
let myLineChart;
Chart.defaults.global.legend.display = true;
Chart.defaults.global.elements.line.tension = 0.4;

export default class LineGraph extends Component {

    chartRef = React.createRef();

    // call buildChart function on Mount
    componentDidMount() {
        this.buildChart();
    }

    // call buildChart function on Update
    componentDidUpdate() {
        this.buildChart();
    }

    buildChart() {
        const MyChartRef = this.chartRef.current.getContext('2d');
        const { data, labels, label, style } = this.props;

        // Destroy myLineChart is already existing
        if (typeof myLineChart !== 'undefined') myLineChart.destroy();

        myLineChart = new Chart(MyChartRef, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: label.labelGraph,
                        data: data,
                        fill: true,
                        borderColor: style.borderColor,
                        backgroundColor: style.backgroundColor,
                        pointRadius: style.pointRadius,
                        pointBackgroundColor: style.pointBackgroundColor,
                        pointHoverRadius: style.pointHoverRadius,
                        pointHoverBackgroundColor: style.pointHoverBackgroundColor
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        ticks: { display: true },
                        gridLines: {
                            display: true,
                            drawBorder: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: true,
                            maxTicksLimit: 5,
                            beginAtZero: true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: label.labelToolTip,
                            
                        },
                        gridLines: {
                            display: true,
                            drawBorder: true
                        }
                    }]
                },
                layout: {
                    padding: {
                        top: 5,
                        left: 15,
                        right: 15,
                        bottom: 15
                    }
                },
                tooltips: {
                    displayColors: false,
                    titleFontSize: 16,
                    bodyFontSize: 14,
                    xPadding: 10,
                    yPadding: 10,
                    callbacks: {
                        label: (tooltipItem) => {
                            return `${tooltipItem.value}${label.labelToolTip}`
                        }
                    }
                }
            }
        });
    }

    render() {
        return (
            <>
                <canvas id="myChart" ref={this.chartRef} />
            </>
        )
    }
}
