import React from 'react';

const Person = (props) => (  
    <div className="personDiv">
      {props.name}
      {props.artistName}
      {props.songTitle}
    </div>
);

export default Person;