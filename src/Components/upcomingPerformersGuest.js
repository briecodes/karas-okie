import React, { Component } from 'react';

export default class UpcomingPerformersGuest extends Component {
    render() {
        return (
            <div id='left'>
                <h4>Upcoming Performers:</h4>
                {this.props.karaokeList}
        </div>
        )
    }
}