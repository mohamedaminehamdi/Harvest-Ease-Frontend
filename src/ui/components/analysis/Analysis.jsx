import React from 'react'
import{Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  plugins,
  scales
} from 'chart.js';
import './Analysis.css'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);



const Analysis = () => {
  const data={
    labels:["2020" ,"2021" ,"2022", "2023", "2024" ,"2025"],
    datasets:[{
      data:[86,114,106,106,107,111],
      backgroundColor: 'transparent',
      borderColor: 'black',
      pointBorderColor:'transparent',
      pointBorderWidth: 4,
      tension: 0.5,
    }]
  };
  const options={
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title:{
          display: true,
          text:'years'
        },
        grid:{
          display: false
        }
        
      },
      y: {
        title:{
          display: true,
          text:'growth'
        },
        min:80,
        max:115,
      },
    },
    
  };
  return (
    <div className='courbe'>
      <h1> Predictive Analysis</h1>
     
      <Line data={data} options={options}   className='chart' ></Line>
     
     
    </div>
  )
}

export default Analysis