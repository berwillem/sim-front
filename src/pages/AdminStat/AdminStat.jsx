import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import "./AdminStat.css"
import { BarChart, LineChart } from '@mui/x-charts';
export default function AdminStat() {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2400, 2210, 2290, 2000, 2181, 2500, 2100];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

  return (
    <div className="statPage">
        <div className="title">
          <h2>
            Dashboard
          </h2>
        </div>
        <div className='statG'>
        <div className="statBox">
        <PieChart
    series={[
      {
        data: [
          { id: 0, value: 10, label: 'series A' },
          { id: 1, value: 15, label: 'series B' },
          { id: 2, value: 20, label: 'series C' },
        ],
        innerRadius: 30,
        outerRadius:    80,
        paddingAngle: 5,
        cornerRadius: 5,
      
      
       
      },
    ]}
    width={300}
    height={200}
  />
        </div>
        <div className="statBox2">
        <LineChart
  width={400}
  height={200}
  series={[
    { data: pData, label: 'pv' },
    { data: uData, label: 'uv' },
  ]}
  xAxis={[{ scaleType: 'point', data: xLabels }]}
/>
        </div>
        <div className="statBox">
        <BarChart
  width={300}
  height={200}
  series={[
    { data: pData, label: 'pv', stack: 'stack1' },
    { data: amtData, label: 'amt' },
    { data: uData, label: 'uv', stack: 'stack1' },
  ]}
  xAxis={[{ data: xLabels, scaleType: 'band' }]}
/>
        </div>
    </div>
    </div>
  )
}
