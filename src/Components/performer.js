import React from 'react';

const Performer = (props) => (  
    <div className='performerDiv'>
        {/* <div className='performerFuncContainer'> */}
            <button value={props.person.id} data-index={props.index} onClick={props.clickHanlder}>X</button>
        {/* </div> */}
        <div className='inlineFloatR'>
            {props.person.name} &nbsp;&nbsp;|&nbsp;&nbsp; {props.position}<br />
            Performing {props.person.artistName}'s {props.person.url ? <em><a href={props.person.url} target='_blank'>{props.person.songTitle}</a></em> : <em>{props.person.songTitle}</em>}
        </div>
        <div className='divider'></div>
    </div>
);

export default Performer;