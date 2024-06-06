
import React from "react";
import './resourcestrackerpage.css';
import { Ressources } from "../Containers";


const ResourcesTrackerPage = () => {
  return (
    <div className="page_container overflow-auto">

      <div className="analysis">
        <Ressources />
      </div>


    </div>
  )
}



export default ResourcesTrackerPage