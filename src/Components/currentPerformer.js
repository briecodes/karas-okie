import React from 'react';

const CurrentPerformer = (props) => (  
    <div className="personDiv">
      <span className='personName'>{props.person.name}</span>&nbsp;&nbsp;|&nbsp;&nbsp; <button value={props.person.id} onClick={props.clickHanlder}>>></button><br />
    Performing {props.person.artistName}'s {props.person.url ? <em><a href={props.person.url} target='_blank'>{props.person.songTitle}</a></em> : <em>{props.person.songTitle}</em>}
    </div>
);

export default CurrentPerformer;