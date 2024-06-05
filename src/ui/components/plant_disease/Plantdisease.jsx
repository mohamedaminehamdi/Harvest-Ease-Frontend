import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plantdisease.css';

const Plantdisease = () => {
  const url = 'http://127.0.0.1:5000/latest_prediction';
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    let timer;
    axios.get(url)
      .then(response => {
        const data = response.data;
        if (data.prediction) {
          console.log(data.prediction);
          setPrediction(data.prediction);
          // Set a timer to clear the prediction after one minute
          timer = setTimeout(() => {
            setPrediction(null);
          }, 60000); // 60000 milliseconds = 1 minute
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching prediction:', error);
      });

    // Clear the timer on component unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='plant-disease-container'>
      <h1>Plant Disease</h1>
      <div>
        {prediction ? (
          <div className='plant-disease-content'>{prediction}</div>
        ) : (
          <div className='loading'>
            <div className='scan'>
              <div className='scan-content'></div>
            </div>
            <h3>Image Scanning ...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plantdisease;
