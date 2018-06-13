import React, { Component } from 'react';
import UUID from 'uuid';

import API_KEY from './token';
import Form from './Components/form';
import UTubeForm from './Components/uTubeForm';
import TubeResult from './Components/tubeResult';
import Person from './Components/person';

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
            url: ''
        },
        hideUrlInput: false,
        searchTerm: '',
        videos: [],
        // karaokeList: []
        // videos: [{ title: 'The Last Shadow Puppets', link: 'https://www.youtube.com/watch?v=Fd1Xc6-6VVg', thumbnails: { default: { url: 'https://i.ytimg.com/an_webp/Fd1Xc6-6VVg/mqdefault_6s.webp?du=3000&sqp=CP2phNkF&rs=AOn4CLDQIyEQNd8IyKxCqUQIBdX71cvOpQ' } } }, { title: 'The Last Shadow Puppets', link: 'https://www.youtube.com/watch?v=Fd1Xc6-6VVg', thumbnails: { default: { url: 'https://i.ytimg.com/an_webp/Fd1Xc6-6VVg/mqdefault_6s.webp?du=3000&sqp=CP2phNkF&rs=AOn4CLDQIyEQNd8IyKxCqUQIBdX71cvOpQ' } } }],
        karaokeList: [{ name: 'Tom', artistName: 'The Last Shadow Puppets', songTitle: 'Aviation', url: 'https://www.youtube.com/watch?v=Fd1Xc6-6VVg' }, { name: 'Johnny Jones', artistName: 'Janelle Monae', songTitle: 'Crazy, Classic Life', url: 'https://www.youtube.com/watch?v=s69xpMzuFmA' }]
    }
    
    estimatedTime = () => {
        return this.state.karaokeList.length * 4;
    }

    submitKaraokeEntry = (e) => {
        e.preventDefault();
        if (this.state.user.name && this.state.user.url && this.state.user.artistName){
            this.setState({
                karaokeList: [...this.state.karaokeList, this.state.user]
            });
            this.postPerformer();
            e.target.reset();
            this.resetAppState();
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
                url: ''
            }
        });
    }

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
        search(this.state.searchTerm, opts, this.youTubeSearchCallback)
    };

    selectVideo = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                url: e.target.value
            }
        });
    };

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


    pullKaraokeList = () => {
        fetch('http://localhost:3000/api/v1/users').then( response => response.json() ).then(array => {
            this.setState({
                karaokeList: array
            });
        });
    };

    postPerformer = () => {
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            body: JSON.stringify(this.state.user),
            headers: {'Content-Type': 'application/json'}
        })
        .then( res => res.json() )
        .then( response => console.log('success:', response ));
    };

    deletePerformer = (e) => {
        fetch('http://localhost:3000/api/v1/users/' + e.target.value, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( response => console.log('success:', response ));
        e.target.parentNode.remove()
    }

    componentDidMount(){
        this.pullKaraokeList();
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
      <div id="container">
        <h1 className='title'>Kara's Okie</h1>
        <div>Estimated Wait Time: {estimatedTime}</div>
        <p></p>
        <p></p>
        <div id="left">
        <h4>Upcoming Performers:</h4>
            {karaokeList}
        </div>
        
        <div id="right">
            <h4>Submit a Song:</h4>
                <Form onSubmit={this.submitKaraokeEntry} user={this.state.user} url={this.state.user.url} onChangeHandler={this.logFieldKeystrokes} resetUrlInput={this.resetUrlInput} hide={this.state.hideUrlInput} />
            <div id="searchUTube">
                < UTubeForm name="searchTerm" onSubmit={this.searchSubmit} onChangeHandler={this.logSearchFieldKeystrokes} />
            </div>
            <div id="results">
                {this.state.videos.length > 0 ? 'Results:' : null }
                {searchResults}
            </div>
        </div>
      </div>
    );
  };
};