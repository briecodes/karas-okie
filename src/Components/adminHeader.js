import React, { Component } from 'react';

export default class AdminHeader extends Component {
    render(){
        return (
            <div id='actionContainer'>
                {this.props.karaokeList.length > 0 ? (
                    <iframe id='player' type='text/html'
                    src={`http://www.youtube.com/embed/${this.props.karaokeList[0].videoId}`} frameBorder='0'></iframe>
                ) : null }
                <div id='upNextList'>
                    <div id='currentPerformer'>
                        UP NOW:
                        {this.props.currentPerformer}
                    </div>
                    {this.props.performerList}
                </div>
            </div>
        )
    }
}