import React from 'react';

const TubeResult = (props) => (
    <div className="individualResult">
        <img src={props.videoInfo.thumbnails.default.url} alt="props.videoInfo.title" className="thumb" />
        <div className="titleContainer">
            {props.videoInfo.title.substring(0, 38)}
        </div>
        <div className="buttonContainer">
            <button type="button" data-videoid={props.videoInfo.id} value={props.videoInfo.link} onClick={props.clickHandler} >Choose Video</button>
        </div>
        <div className="divider"></div>
    </div>
);

export default TubeResult;