import React, { Component } from 'react';
import UUID from 'uuid';

import API_KEY from './token';
import SubmitForm from './Components/submitForm';
import UTubeForm from './Components/uTubeForm';
import TubeResult from './Components/tubeResult';
import Person from './Components/person';
import Performer from './Components/performer';

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
        searchTerm: '',
        videos: [],
        karaokeList: [],
        adminMode: false
    };



    // DEFAULT APP / LIFECYCLE FUNCTIONS

    componentDidMount(){
        this.fetchPerformerList();
    };
    
    estimatedTime = () => {
        return this.state.karaokeList.length * 4;
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
    };


    


    
    // USER ACTIONS

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
        }else if (e.target.name === 'searchTerm'){
            this.setState({
                searchTerm: e.target.value
            });
        };
    };

    submitYouTubeSearch = (e) => {
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

    submitKaraokeEntry = (e) => {
        e.preventDefault();
        if (this.state.user.name && this.state.user.url && this.state.user.artistName){
            this.setState({
                karaokeList: [...this.state.karaokeList, this.state.user]
            });
            this.postPerformer();
            e.target.reset();
        };
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

    fetchPerformerList = () => {
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

    
    ratio = () => {
        const widthIs = (80/100) * window.innerWidth;
        const aspectRatio = 640 / 390;
        const height = widthIs / aspectRatio;
        if (document.getElementById('player')){
            console.log(document.getElementById('player'));
            document.getElementById('player').style.width = height + 'px';
        }
    }

    switchMode = () => {
        this.setState({
            adminMode: !this.state.adminMode
        })
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
            const estTime = index * 4;
            const position = index !== 0 ? 'in: ' + estTime + 'mins' : 'Currently Up';
            return <Person person={person} position={position} key={UUID()} clickHanlder={this.deletePerformer} />
        });
        return arr;
    };

    renderPerformerList = () => {
    	let arr = this.state.karaokeList.map((person, index) => {
            if (index !== 0){
                const estTime = index * 4;
                const position = index !== 1 ? 'In: ' + estTime + 'mins' : 'Up Next';
                return <Performer person={person} position={position} key={UUID()} clickHanlder={this.deletePerformer} />
            }
        });
        return arr;
    };

    currentPerformer = () => {
        let arr = this.state.karaokeList.map((person, index) => {
            if (index === 0){
                return <Person person={person} position='1' key={UUID()} clickHanlder={this.deletePerformer} />
            }
        });
        return arr;
    }

  render() {
    const searchResults = this.renderVideoSearchResults();
    const karaokeList = this.renderKaraokeList();
    const currentPerformer = this.currentPerformer();
    const performerList = this.renderPerformerList();
    const estimatedTime = this.estimatedTime();
    return (
      <div id='container'>
        <h1 className='title' onClick={this.switchMode}>Kara's Okie</h1>

        { this.state.adminMode ? 'Admin Mode: ON' : 'Admin Mode: OFF'}

        { this.state.adminMode ? (
            <div id='actionContainer'>
            {this.state.karaokeList.length > 0 ? (
                <iframe id='player' type='text/html'
                src={`http://www.youtube.com/embed/${this.state.karaokeList[0].videoId}`} frameBorder='0'></iframe>
            ) : null }
            <div id='upNextList'>
                <div id='currentPerformer'>
                    UP NOW:
                    {currentPerformer}
                </div>
                {performerList}
            </div>
        </div>
         ) : 'Admin Mode: OFF'}

        <div><p></p><p></p><p></p><p></p><p></p><p></p></div>
        <div>Estimated Wait Time: {estimatedTime}</div>
        
        <p></p>
        <p></p>

        <div id='left'>
        <h4>Upcoming Performers:</h4>
            {karaokeList}
        </div>
        
        <div id='right'>
            <h4>Submit a Song:</h4>
                <SubmitForm onSubmit={this.submitKaraokeEntry} user={this.state.user} onChangeHandler={this.logFieldKeystrokes} />
            <div id='searchUTube'>
                < UTubeForm name='searchTerm' value={this.state.searchTerm} onSubmit={this.submitYouTubeSearch} onChangeHandler={this.logFieldKeystrokes} />
            </div>
            <div id='results'>
                {this.state.videos.length > 0 ? 'Results:' : null }
                {searchResults}
            </div>
        </div>
      </div>
    );
  };
};