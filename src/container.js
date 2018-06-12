import React, { Component } from 'react';
import UUID from 'uuid';

import Form from './Components/form';
import UTubeForm from './Components/uTubeForm';
import TubeResult from './Components/tubeResult';

const API = '';
let search = require('youtube-search');
let opts = {
    maxResults: 10,
    key: API,
    type: 'videos'
  };

export default class Container extends Component {

    state = {
        user: {
            name: '',
            artistName: '',
            songTitle: '',
            url: ''
        },
        videos: [],
        searchTerm: '',
        karaokeList: []
    }
    
    componenetWillMount () {
    	// LOAD JSON API
    }
    
    persistUser = () => {
    	//FETCH(URL) HERE. CONSULT WITH JOE. TEST METHOD.
    	{this.state.user}
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            user: {
                name: e.target.name.value,
                artistName: e.target.artistName.value,
                songTitle: e.target.songTitle.value,
                url: e.target.url.value
            }
        });
        e.target.reset();
    };

    searchSubmit = (e) => {
        e.preventDefault();
        this.searchYouTube();
        e.target.reset();
    };

    youTubeSearchCallback = (err, results) => {
        let arr = []
        if(err) return console.log(err);
        results.forEach(item =>{
            arr.push(item);
        });
        this.setState({
            videos: arr
        });
    }

    searchYouTube = () => {
        let please = search(this.state.searchTerm, opts, this.youTubeSearchCallback)
        console.log(please)
        
    };

    typeSet = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    };

    renderVideoSearchResults = () => {
        let arr = this.state.videos.map(item => {
            return <TubeResult videoInfo={item} key={UUID()} clickHandler={this.selectVideo} />
        });
        return arr
    };
    
    renderKaraokeList = () => {
    // TEST METHOD
    	let arr = this.state.karaokeList.map(person => {
    		return <Person person={person} key={UUID()} />
    	});
    }
    
    selectVideo = (e) => {
    	console.log(e.target.value);
    	// TEST METHOD. REVIEW OBJECT INSERTION.
    //	this.setState({
    //	user: {
    //			url: e.target.value
   // 		}
    //	});
    }

  render() {
    const searchResults = this.renderVideoSearchResults();
    const karaokeList = this.renderKaraokeList();
    return (
      <div id="container">
          <h1>Kara's Okie</h1>
          <div id="left">
          	{karaokeList}
            {this.state.user.name}
            {this.state.user.artistName}
            {this.state.user.songTitle}
            {this.state.user.url}
            {this.state.searchTerm}
          </div>
          
          <div id="right">
            <Form onSubmit={this.onSubmit} />
            <div id="searchUTube">
                < UTubeForm name="searchTerm" onSubmit={this.searchSubmit} onChangeHandler={this.typeSet} />
            </div>
            <div id="results">Results:
                {searchResults}
            </div>
          </div>
      </div>
    );
  };
};