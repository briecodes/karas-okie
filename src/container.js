import React, { Component } from 'react';
import UUID from 'uuid';

import API_KEY from './token';
import SubmitForm from './Components/form';
import UTubeForm from './Components/uTubeForm';
import TubeResult from './Components/tubeResult';
import Person from './Components/person';

const API_URL = 'https://karaoke-api.herokuapp.com/api/v1/users';

let search = require('youtube-search');
let opts = {
    maxResults: 10,
    key: API_KEY,
    type: 'videos'
  };

export default class Container extends Component {

    state = {
        user: {
            name: '',
            artistName: '',
            songTitle: '',
            url: '',
            videoId: ''
        },
        hideUrlInput: false,
        searchTerm: '',
        videos: [],
        karaokeList: []
    }

    componentDidMount(){
        this.getKaraokeList();
    }
    
    estimatedTime = () => {
        return this.state.karaokeList.length * 4;
    }


    

    
    // USER ACTIONS

    submitKaraokeEntry = (e) => {
        e.preventDefault();
        if (this.state.user.name && this.state.user.url && this.state.user.artistName){
            this.setState({
                karaokeList: [...this.state.karaokeList, this.state.user]
            });
            this.postPerformer();
            e.target.reset();
            // this.resetAppState();
        };
    };

    resetAppState = () => {
        this.setState({
            searchTerm: '',
            videos: [],
            user: {
                name: '',
                artistName: '',
                songTitle: '',
                url: '',
                videoId: ''
            }
        });
    }

    resetUrlInput = () => {
        this.setState({
            hideUrlInput: false,
            user: {
                ...this.state.user,
                url: ''
            }
        });
    };

    logSearchFieldKeystrokes = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    };

    logFieldKeystrokes = (e) => {
        if (e.target.name === 'name'){
            this.setState({
                user: {
                    ...this.state.user,
                    name: e.target.value
                }
            });
        }else if (e.target.name === 'artistName'){
            this.setState({
                user: {
                    ...this.state.user,
                    artistName: e.target.value
                }
            });
        }else if (e.target.name === 'songTitle'){
            this.setState({
                user: {
                    ...this.state.user,
                    songTitle: e.target.value
                }
            });
        }else if (e.target.name === 'url'){
            this.setState({
                user: {
                    ...this.state.user,
                    url: e.target.value
                }
            });
        };
    };

    searchSubmit = (e) => {
        e.preventDefault();
        this.searchYouTube();
        e.target.reset();
    };

    selectVideo = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                url: e.target.value,
                videoId: e.target.dataset.videoid
            }
        });
    };








    // CRUD ACTIONS
    searchYouTube = () => {
        search(this.state.searchTerm, opts, this.youTubeSearchCallback)
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
    };

    getKaraokeList = () => {
        fetch(API_URL).then( response => response.json() ).then(array => {
            this.setState({
                karaokeList: array
            });
        });
    };

    postPerformer = () => {
        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(this.state.user),
            headers: {'Content-Type': 'application/json'}
        })
        .then( res => res.json() )
        .then( response => console.log('success:', response ))
        .then(this.resetAppState());
    };

    deletePerformer = (e) => {
        fetch(API_URL + '/' + e.target.value, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( response => console.log('success:', response ));
        e.target.parentNode.remove()
    }

    
    
    
    
    // RENDER METHODS

    renderVideoSearchResults = () => {
        let arr = this.state.videos.map(item => {
            return <TubeResult videoInfo={item} key={UUID()} clickHandler={this.selectVideo} />
        });
        return arr
    };
    
    renderKaraokeList = () => {
    	let arr = this.state.karaokeList.map((person, index) => {
            const estTime = index * 4
            return <Person person={person} position={index !== 0 ? 'in: ' + estTime + 'mins' : 'Currently Up'} key={UUID()} clickHanlder={this.deletePerformer} />
        });
        return arr;
    }

  render() {
    const searchResults = this.renderVideoSearchResults();
    const karaokeList = this.renderKaraokeList();
    const estimatedTime = this.estimatedTime();
    return (
      <div id='container'>
        <h1 className='title'>Kara's Okie</h1>
        <div>Estimated Wait Time: {estimatedTime}</div>
        <p></p>
        <p></p>
        <div id='left'>
        <h4>Upcoming Performers:</h4>
            {karaokeList}
        </div>
        
        <div id='right'>
            <h4>Submit a Song:</h4>
                <SubmitForm onSubmit={this.submitKaraokeEntry} user={this.state.user} url={this.state.user.url} onChangeHandler={this.logFieldKeystrokes} resetUrlInput={this.resetUrlInput} hide={this.state.hideUrlInput} />
            <div id='searchUTube'>
                < UTubeForm name='searchTerm' value={this.state.searchTerm} onSubmit={this.searchSubmit} onChangeHandler={this.logSearchFieldKeystrokes} />
            </div>
            <div id='results'>
                {this.state.videos.length > 0 ? 'Results:' : null }
                {searchResults}
                {/* <iframe id='player' type='text/html' width='640' height='390'
                src={`http://www.youtube.com/embed/${this.state.user.videoId}`} frameborder='0'></iframe> */}
            </div>
        </div>
      </div>
    );
  };
};