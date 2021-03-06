import React, { Component } from 'react';
import UUID from 'uuid';

import API_KEY from './token2';
import TubeResult from './Components/tubeResult';
import Person from './Components/person';
import Performer from './Components/performer';
import CurrentPerformer from './Components/currentPerformer';
import UpcomingPerformersGuest from './Components/upcomingPerformersGuest';
import SongSearch from './Components/songSearch';
import AdminHeader from './Components/adminHeader'

const API_URL = 'https://karaoke-api.herokuapp.com/api/v1/users';
const SEED = [{
        name: 'MIKE HARRIS',
        artistName: 'TLSP',
        songTitle: 'Aviation',
        url: 'https://www.youtube.com/watch?v=Fd1Xc6-6VVg',
        videoId: 'Fd1Xc6-6VVg'
    },
    {
        name: 'Vikrum',
        artistName: 'Saul Williams',
        songTitle: 'Burundi',
        url: 'https://www.youtube.com/watch?v=BeFm3Oda5hw',
        videoId: 'BeFm3Oda5hw'
    },
    {
        name: 'El Stungun',
        artistName: 'Yeah Yeah Yeahs',
        songTitle: 'Maps',
        url: 'https://www.youtube.com/watch?v=oIIxlgcuQRU',
        videoId: 'oIIxlgcuQRU'
    },
    {
        name: 'Shun',
        artistName: 'Nas',
        songTitle: 'NY State of Mind',
        url: 'https://www.youtube.com/watch?v=hI8A14Qcv68',
        videoId: 'hI8A14Qcv68'
    },
    {
        name: 'Not Shun',
        artistName: 'Yasiin Bey',
        songTitle: 'Ms Fat Booty',
        url: 'https://www.youtube.com/watch?v=B-y-lS0YqF0',
        videoId: 'B-y-lS0YqF0'
    }
]

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
        const fetchInterval = window.setInterval(this.fetchPerformerList, 1000);
    };

    componentWillUnmount() {
        clearInterval(this.fetchInterval);
    }
    
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

    seedApp = () => {
        for (const person of SEED){
            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(person),
                headers: {'Content-Type': 'application/json'}
            })
            .then( res => res.json() )
            .then( response => console.log('success:', response ));
        }
    }


    


    
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
        console.log("fetching...");
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
        // e.target.parentNode.remove();
        fetch(API_URL + '/' + e.target.value, {
            method: 'DELETE'
        });
    };

    nextPerformer = (e) => {
        const pList = this.state.karaokeList;
        pList.shift();
        this.setState({
            karaokeList: pList
        });
        fetch(API_URL + '/' + e.target.value, {
            method: 'DELETE'
        });
        // e.target.parentNode.remove();
    };

    
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
                return <Performer person={person} index={index} position={position} key={UUID()} clickHanlder={this.deletePerformer} />
            }
        });
        return arr;
    };

    currentPerformer = () => {
        let arr = this.state.karaokeList.map((person, index) => {
            if (index === 0){
                return <CurrentPerformer person={person} position='1' key={UUID()} clickHanlder={this.nextPerformer} />
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
        <h1 className='title'>Kara's Oki<span onClick={this.switchMode} >e</span></h1>

        { this.state.adminMode ? <AdminHeader karaokeList={this.state.karaokeList} currentPerformer={currentPerformer} performerList={performerList} /> : null }
        <div className='divider'></div>
        <div className='est' onClick={this.seedApp}>Estimated Wait Time: {estimatedTime}</div>
        <div className='divider'></div>
        
        {this.state.adminMode ? null : <UpcomingPerformersGuest karaokeList={karaokeList} /> }
        {this.state.adminMode ? null : <SongSearch videos={this.state.videos} searchResults={searchResults} submitKaraokeEntry={this.submitKaraokeEntry} user={this.state.user} logFieldKeystrokes={this.logFieldKeystrokes} searchTerm={this.state.searchTerm} submitYouTubeSearch={this.submitYouTubeSearch} logFieldKeystrokes={this.logFieldKeystrokes} /> }

      </div>
    );
  };
};