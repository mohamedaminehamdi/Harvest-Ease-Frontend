import React from 'react'
import './plantscanner.css';
import {Plantdisease, Plantinfo } from '../components';


const PlantScanner = () => {
  return (
    <div className='plant_scanner_container'>

<div className="plantinfo">
        <Plantinfo />
      </div>

      <div className='plantdisease'>
        <Plantdisease />
      </div>

     
      
    </div>
  )
}

export default PlantScanner