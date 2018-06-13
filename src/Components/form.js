import React, { Component } from 'react';

import TextInput from './textInput';

export default class Form extends Component {
    removeUrl = () => {

    }
    render() {
        return (
            <form onSubmit={this.props.onSubmit} >
                <div className="block">
                    <label>Name: 
                        < TextInput name={"name"} value={this.props.user.name} onChangeHandler={this.props.onChangeHandler} />
                    </label>
                </div>
                <div className="block">
                    <label>Artist Name: 
                        < TextInput name={"artistName"} value={this.props.user.artistName} onChangeHandler={this.props.onChangeHandler} />
                    </label>
                </div>
                <div className="block">
                    <label>Song Title: 
                        < TextInput name={"songTitle"} value={this.props.user.songTitle} onChangeHandler={this.props.onChangeHandler} />
                    </label>
                </div>
                <div className="block">
                    <label>URL (Not Required):
                        {this.props.hide ? <p>{this.props.user.url} &nbsp;&nbsp; <input type="button" value="Remove" onClick={this.props.resetUrlInput} /></p> : < TextInput name={"url"} placeholder={this.props.user.url} value={this.props.user.url} onChangeHandler={this.props.onChangeHandler} /> }
                    </label>
                </div>
                <input type="submit"/>
            </form>
        );
    };
};