import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import "./Contenido.modules.css";


function onClick(e){
  // e.target.style.display = 'inline-block'

  // el evento click debe ser llamado desde la imagen con los id especificado en los case.
  switch(e.target.id){
    case 'visionImg':
      document.getElementById('mission').style.display = 'none'
      document.getElementById('values').style.display = 'none'
      document.getElementById('vision').style.display = 'inline-block'
      break
    case 'valuesImg':
      document.getElementById('vision').style.display = 'none'
      document.getElementById('mission').style.display = 'none'
      document.getElementById('values').style.display = 'inline-block'
      break
    case 'missionImg':
      document.getElementById('vision').style.display = 'none'
      document.getElementById('values').style.display = 'none'
      document.getElementById('mission').style.display = 'inline-block'
    break
  }
}

// Recibe props con Products.info

function Contenido(props) {
  
  return (
   <div id="contenido" >

<h1 id='title' onClick={(e)=>{onClick(e)}}>
    Wine Store
</h1>

<div id="vision">
 <h1>Vision</h1>
 <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis delectus vero sequi quasi, 
   suscipit commodi dicta quo laborum,
    est neque laudantium qui nam architecto illo repudiandae consectetur sapiente nihil? Quam? </p>
</div>

<div id="mission">
 <h1>Mission</h1>
 <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis delectus vero sequi quasi, 
   suscipit commodi dicta quo laborum,
    est neque laudantium qui nam architecto illo repudiandae consectetur sapiente nihil? Quam? </p>
</div>

<div id="values">
 <h1>Values</h1>
 <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis delectus vero sequi quasi, 
   suscipit commodi dicta quo laborum,
    est neque laudantium qui nam architecto illo repudiandae consectetur sapiente nihil? Quam? </p>
</div>
<img id='visionImg' src='https://o.remove.bg/downloads/199020e5-cb8c-4308-98e9-d229fcb1aab1/vission-removebg-preview.png'>

  
</img>

<img id='missionImg' src='https://o.remove.bg/downloads/e4581be7-9b08-4472-b7fb-43b43fc28611/values-removebg-preview.png'></img>


  <img id='missionImg' src='https://o.remove.bg/downloads/eb60a1a9-d44b-4164-96c4-2d1b8e8ab51e/mission-removebg-preview.png'></img>
   </div>

   
  );
}

export default Contenido;