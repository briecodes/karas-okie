import React, { Component } from 'react';

import TextInput from './textInput';

export default class Form extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} >
                <label>Name: 
                    < TextInput name={"name"} />
                </label>
                <label>Artist Name: 
                    < TextInput name={"artistName"} />
                    </label>
                <label>Song Title: 
                    < TextInput name={"songTitle"} />
                </label>
                <label>URL: 
                    < TextInput name={"url"} />
                </label>
                <input type="submit"/>
            </form>
        );
    };
};