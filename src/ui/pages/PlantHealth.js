import React from 'react'
import './plantHealth.css';
import { PlantScanner } from '../Containers';
import '../components/SettingsPage.css'


const PlantHealth = () => {
  return (
    <div className='plant_health overflow-hidden'>

      <div className='plant_scanner'>
        <PlantScanner/>
      </div>



      
    </div>
  )
}

export default PlantHealth