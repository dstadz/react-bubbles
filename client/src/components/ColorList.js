import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from './BubblePage'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);


//  useEffect(() => {
   
//    return () => {
     
//    };
//  }, [colorToEdit])


  const editColor = color => {
    setEditing(true);
    console.log(color)
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    setEditing(false);
    
    console.log(colorToEdit)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axios({
      method: 'put',
      url:`http://localhost:5000/api/colors/${colorToEdit.id}`, 
      headers: {authorization: sessionStorage.getItem('token')},
      data:{
        color: colorToEdit.color,
        code: colorToEdit.code
      }
    })
    .then(res => {
      console.log(res.data)
      updateColors(res.data)
    })
    .catch(err => console.log(err))
  };







  const deleteColor = color => {
    //console.log(color)
    // make a delete request to delete this color
    axios.delete(`http://localhost:5000/api/colors/${color.id}`, 
    {headers: {authorization: sessionStorage.getItem('token')}})
    axios.get(`http://localhost:5000/api/colors`,
    {headers: {authorization: sessionStorage.getItem('token')}})
    .then(res => {
      //console.log(res.data)
      updateColors(res.data)
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }}> x </span> 

              {" "} {color.color}
            </span>

            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e => setColorToEdit({ ...colorToEdit, color: e.target.value })}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e => setColorToEdit({ ...colorToEdit,code: { hex: e.target.value }})}
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
