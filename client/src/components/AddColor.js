import React, { useState } from 'react';
import axios from 'axios';
import ColorList from './ColorList';



const AddColor = props => {
  console.log(props)
  const [newColor, setNewColor] = useState({
    color:'',
    code:'',
  });

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }

    setNewColor({
      ...newColor,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/colors',
    {headers: {authorization: sessionStorage.getItem('token')}},
    newColor)
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} >
      <input
          type="string"
          name="code"
          onChange={changeHandler}
          placeholder="#"
          value={newColor.code}
        />
        <input
        type="string"
        name="color"
        onChange={changeHandler}
        placeholder="#"
        value={newColor.color}
      />

        <button className="md-button form-button">Add New Item</button>
      </form>
    </div>
  );
};

export default AddColor;
