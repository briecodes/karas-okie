import React, { Component } from 'react';

export default class UpcomingPerformersGuest extends Component {
    render() {
        return (
            <div id='left'>
                <h4>Upcoming Performers II:</h4>
                {this.props.karaokeList}
        </div>
        )
    }
}