import React from 'react';

const TubeResult = (props) => (
    <div>
        <img src={props.video.thumbnails.default.url} alt="props.video.title" />
        {props.video.title} / {props.video.link}
    </div>
);

export default TubeResult;