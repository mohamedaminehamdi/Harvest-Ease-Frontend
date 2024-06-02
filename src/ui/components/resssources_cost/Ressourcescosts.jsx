import React from 'react'
import './ressources_costs.css'

const Ressourcescosts = () => {
  const[ressources, setRessources] = React.useState("predict");

  return (
    <div className='ressources-container'>

      <h1 className='ressources-container-title'>Ressources & Costs</h1> 

      <form action="" className="ressources_data">

       <div className="ressources_inputs">
          <label>Nitrogen</label>
          <input type="number" placeholder="Enter Nitrogen Level" />
       </div>
       <div className="ressources_inputs">
          <label>Phosphorus</label>
          <input type="number" placeholder="Enter Phosphorus Level" />
       </div>
       <div className="ressources_inputs">
          <label>Potassium</label>
          <input type="number" placeholder="Enter Potassium Level" />
       </div>
       <div className="ressources_inputs">
          <label>Tempeture</label>
          <input type="number" placeholder="Enter Tempeture Level in °C" />
       </div>
       <div className="ressources_inputs">
          <label>Humidity</label>
          <input type="number" placeholder="Enter Humidity Level in %" />
       </div>
       <div className="ressources_inputs">
          <label>pH</label>
          <input type="number" placeholder="Enter pH Level" />
       </div>
       <div className="ressources_inputs">
          <label>Rainfall</label>
          <input type="number" placeholder="Enter Rainfall Level in mm" />
       </div>
      
      <button type="submit">Submit</button>
       
      </form>
    </div>
  )
}

export default Ressourcescosts