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

  const url = "YOUR_API_URL_HERE";

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
          name: data.plant_name,
          family: data.plant_family,
          image: base64Image
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error("There was an error uploading the image!", error);
        });
      };
    }
  }

  return (
    <div className='plant_info_container'>
      <form className='form_plant-info' onSubmit={handleApi} >
        <section className='form_plant-img' onClick={() => document.querySelector('.img-input').click()}>
          <input
            type="file"
            accept='image/*'
            name='plantimg'
            id='plantimg'
            className='img-input'
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setImgUrl(files[0].name);
              if (files) {
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
          <h3>Plant Family</h3>
          <input
            onChange={handleChange}
            id='plant_family'
            value={data.plant_family}
            type="text"
            placeholder="Enter Plant Family"
          />
        </section>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Plantinfo;
