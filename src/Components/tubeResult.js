import React from 'react';

const TubeResult = (props) => (
    <div className="individualResult">
        <img src={props.videoInfo.thumbnails.default.url} alt="props.videoInfo.title" className="thumb" />
        <div className="info">
            {props.videoInfo.title}
        </div>
        <div className="info">
            <button type="button" value={props.videoInfo.link} >Choose Video</button>
        </div>
        <div className="divider"></div>
    </div>
);

export default TubeResult;