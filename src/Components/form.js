import React, { Component } from 'react';

import TextInput from './textInput';

export default class Form extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} >
                <div className="block">
                    <label>Name: 
                        < TextInput name={"name"} />
                    </label>
                </div>
                <div className="block">
                    <label>Artist Name: 
                        < TextInput name={"artistName"} />
                    </label>
                </div>
                <div className="block">
                    <label>Song Title: 
                        < TextInput name={"songTitle"} />
                    </label>
                </div>
                <div className="block">
                    <label>URL: 
                        < TextInput name={"url"} />
                    </label>
                </div>
                <input type="submit"/>
            </form>
        );
    };
};