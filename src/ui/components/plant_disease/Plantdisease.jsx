import React , {useEffect,useState} from 'react'
import './plantdisease.css'




const Plantdisease = () => {
  const url=''
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    fetch(url)
    .then(response=>response.json())
    .then(response=>{
      const {body}  = response
      setPosts(body)
    })
  }, [])
  return (
    <div className='plant-disease-container'>

      <h1>Plant Disease</h1>
      <div>
        {posts?<div className='plant-disease-content'>{posts}</div>: <div className='loading'>
        
        <div className='scan'>
           <div className='scan-content'>
            
            </div>
          </div>
          <h3>Image Scanning ...</h3>

          </div>}
      </div>

     </div>
  )
}

export default Plantdisease