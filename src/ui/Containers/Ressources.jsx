import React from "react";
import './ressources.css';
import  { Monitring, Ressourcescosts, Analysis, Weather }   from "../components"; 

const Resources = () => {
  return (

    <div className="tracker_container">
      <div className="analysis">
        <Analysis />
      </div>
      <div className="weather">
        <Weather />
      </div>
      <div className="monitoring">
        <Monitring />
      </div>
      <div className="resourcescosts">
        <Ressourcescosts />
      </div>
      
    </div>

  )
}

export default Resources