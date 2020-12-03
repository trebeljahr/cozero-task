import React from 'react'
import { Line } from 'react-chartjs-2'
import { GraphData } from './types'

const timeFormat = {
  type: 'time',
  time: {
    displayFormats: {
      millisecond: 'MMM DD',
      second: 'MMM DD',
      minute: 'MMM DD',
      hour: 'MMM DD',
      day: 'MMM DD',
      week: 'MMM DD',
      month: 'MMM DD',
      quarter: 'MMM DD',
      year: 'MMM DD',
    },
  },
}
const options = {
  scales: {
    xAxes: [timeFormat],
    yAxes: [{ ticks: { callback: (value: number) => '$' + value.toFixed(2) } }],
  },
}
const color = '#007bff'

export function ChartPresentation({ graphData }: { graphData: GraphData }): JSX.Element {
  const prices = graphData.prices.map((dataPoint: [number, number]) => ({
    x: dataPoint[0],
    y: dataPoint[1],
  }))
  const data = {
    labels: prices.map((price: { x: number; y: number }) => new Date(price.x)),
    legend: false,
    datasets: [
      {
        fill: false,
        bezierCurve: false,
        tension: 0,
        backgroundColor: color,
        borderColor: color + '66',
        label: 'Prices',
        data: prices.map((price: { x: number; y: number }) => price.y),
      },
    ],
  }
  return <Line data={data} options={options} />
}
