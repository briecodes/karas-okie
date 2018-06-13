import React from 'react';

const Person = (props) => (  
    <div className="personDiv">
      <span className='personName'>{props.person.name}</span> {props.position}<br />
    Performing {props.person.artistName}'s <em><a href={props.person.url} target='_blank'>{props.person.songTitle}</a></em><br />
    </div>
);

export default Person;