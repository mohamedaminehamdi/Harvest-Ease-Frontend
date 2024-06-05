import React, { useState } from 'react';
import Axios from 'axios';
import './plantinfo.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

const Plantinfo = () => {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("Please upload an image");
  const [data, setData] = useState({
    plant_name: "",
    plant_family: "",
  });
  const url = "http://127.0.0.1:5000/predict";

  function handleChange(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function handleApi(e) {
    e.preventDefault();
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64Image = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        Axios.post(url, {
          image: base64Image,
          plant_name: data.plant_name,
          plant_family: data.plant_family
        })
        .then((res) => {
          console.log(res.data);
          window.location.reload(); // Refresh the page
        })
        .catch((error) => {
          console.error("There was an error uploading the image!", error);
        });
      };
      reader.onerror = (error) => {
        console.error("There was an error reading the file!", error);
      };
    } else {
      console.error("No image selected");
    }
  }

  return (
    <div className='plant_info_container'>
      <form className='form_plant-info' onSubmit={handleApi}>
        <section className='form_plant-img' onClick={() => document.querySelector('.img-input').click()}>
          <input
            type="file"
            accept='image/*'
            name='plantimg'
            id='plantimg'
            className='img-input'
            hidden
            onChange={({ target: { files } }) => {
              if (files.length > 0) {
                setImgUrl(files[0].name);
                setImage(files[0]);
              }
            }}
          />
          {image ?
            <img src={URL.createObjectURL(image)} className='image' alt={imgUrl} /> :
            <>
              <MdCloudUpload className='upload-icon' color='#2A8316' size={100} />
              <p>Browse files to upload image</p>
            </>
          }
        </section>
        <section className='uploaded-row'>
          <AiFillFileImage className='image_icon' color='#2A8316' size={40} />
          {imgUrl}
          <MdDelete
            className='delete-icon'
            color='#2A8316'
            size={40}
            onClick={() => {
              setImage(null);
              setImgUrl("Please upload an image");
            }}
          />
        </section>
        <section className='plant_type'>
          <h3>Plant Name</h3>
          <input
            onChange={handleChange}
            id='plant_name'
            value={data.plant_name}
            type="text"
            placeholder="Enter Plant Name"
          />
        </section>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Plantinfo;
