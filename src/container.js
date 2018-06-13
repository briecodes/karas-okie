import React, { Component } from 'react';
import UUID from 'uuid';

import Form from './Components/form';
import UTubeForm from './Components/uTubeForm';
import TubeResult from './Components/tubeResult';
import Person from './Components/person';

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
        hideUrlInput: false,
        searchTerm: '',
        videos: [{ title: 'The Last Shadow Puppets', link: 'https://www.youtube.com/watch?v=Fd1Xc6-6VVg', thumbnails: { default: { url: 'https://i.ytimg.com/an_webp/Fd1Xc6-6VVg/mqdefault_6s.webp?du=3000&sqp=CJaggdkF&rs=AOn4CLBtTnNzfEXA44KXPQCVo8i1FhUSow' } } }, { title: 'The Last Shadow Puppets', link: 'https://www.youtube.com/watch?v=Fd1Xc6-6VVg', thumbnails: { default: { url: 'https://i.ytimg.com/an_webp/Fd1Xc6-6VVg/mqdefault_6s.webp?du=3000&sqp=CJaggdkF&rs=AOn4CLBtTnNzfEXA44KXPQCVo8i1FhUSow' } } }],
        karaokeList: [{ name: 'Tom', artistName: 'The Last Shadow Puppets', songTitle: 'Aviation', url: 'https://www.youtube.com/watch?v=Fd1Xc6-6VVg' }, { name: 'Johnny Jones', artistName: 'Janelle Monae', songTitle: 'Crazy, Classic Life', url: 'https://www.youtube.com/watch?v=s69xpMzuFmA' }]
    }
    
    estimatedTime = () => {
        return this.state.karaokeList.length * 4;
    }

    submitKaraokeEntry = (e) => {
        e.preventDefault();
        this.setState({
            karaokeList: [...this.state.karaokeList, this.state.user]
        })
        e.target.reset();
        this.resetUserState();
    };

    resetUserState = () => {
        this.setState({
            hideUrlInput: false,
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
            hideUrlInput: !this.state.hideUrlInput,
            user: {
                ...this.state.user,
                url: e.target.value
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
            return <Person person={person} position={index !== 0 ? 'in: ' + estTime + 'mins' : 'Currently Up'} key={UUID()} />
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
                <Form onSubmit={this.submitKaraokeEntry} user={this.state.user} url={this.state.user.url} onChangeHandler={this.logFieldKeystrokes} hide={this.state.hideUrlInput} />
            <div id="searchUTube">
                < UTubeForm name="searchTerm" onSubmit={this.searchSubmit} onChangeHandler={this.logSearchFieldKeystrokes} />
            </div>
            <div id="results">Results:
                {searchResults}
            </div>
        </div>
      </div>
    );
  };
};