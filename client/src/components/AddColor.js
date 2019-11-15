import React, { useState } from 'react';
import axios from 'axios';
import ColorList from './ColorList';



const AddColor = props => {
  const [newColor, setNewColor] = useState({
    color:'',
    code:'',
  });

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;


    setNewColor({
      ...newColor,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url:`http://localhost:5000/api/colors`, 
      headers: {authorization: sessionStorage.getItem('token')},
      data:{
        color: newColor.color,
        code: newColor.code
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))


  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} >
      <input
          type="string"
          name="color"
          onChange={changeHandler}
          placeholder="Color"
          value={newColor.color}
        />
        <input
        type="string"
        name="code"
        onChange={changeHandler}
        placeholder="#000000"
        value={newColor.code}
      />

        <button className="md-button form-button">Add New Item</button>
      </form>
    </div>
  );
};

export default AddColor;
