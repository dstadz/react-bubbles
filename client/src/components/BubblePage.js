import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";


const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: sessionStorage.getItem('token")')
    }
  })
}


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getData = () => {
    axios.get(`http://localhost:5000/api/colors`, {
      headers: {authorization:  sessionStorage.getItem('token')}
    })
    .then(res => {
      console.log(res)
      setColorList(res.data)
  })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
    if(!sessionStorage.getItem('token')) console.log('you need to log in')
    else console.log('you are in')
  },[])

  return (
    <>
    <h1>You are on the BubblePage</h1> 
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
