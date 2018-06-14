import React, { Component } from 'react';

import SubmitForm from './submitForm';
import UTubeForm from './uTubeForm';

export default class SongSearch extends Component {
    render() {
        return (
            <div id='right'>
                <h4>Submit a Song:</h4>
                    <SubmitForm onSubmit={this.props.submitKaraokeEntry} user={this.props.user} onChangeHandler={this.props.logFieldKeystrokes} />
                <div id='searchUTube'>
                    < UTubeForm name='searchTerm' value={this.props.searchTerm} onSubmit={this.props.submitYouTubeSearch} onChangeHandler={this.props.logFieldKeystrokes} />
                </div>
                <div id='results'>
                    {this.props.videos.length > 0 ? 'Results:' : null }
                    {this.props.searchResults}
                </div>
            </div>
        )
    }
}