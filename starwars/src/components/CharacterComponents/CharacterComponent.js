import React from 'react';
import './Character.css';

const CharacterComponent = (props) => {
  return (
    <div className="character-container"> 
      <div className="header">
        <div className="initials">
          {
            props.character.name[0]
          }
        </div>
        <div className="name">
          {props.character.name}
        </div>
      </div>
      <div className="description">
        <div className="attribute">
          <span> Gender: </span> {props.character.gender}
        </div>
        <div className="attribute">
          <span> Height: </span> {props.character.height}
        </div>
        <div className="attribute">
          <span> Skin Color: </span> {props.character.skin_color}
        </div>

        <div className="attribute">
          <span> Mass: </span> {props.character.mass}
        </div>
      </div>
      
    </div>
  )
}

export default CharacterComponent;