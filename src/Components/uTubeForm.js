import React, { Component } from 'react';

import TextInput from './textInput';

export default class uTubeForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} >
                <label>Search YouTube: 
                    < TextInput name={this.props.name} onChangeHandler={this.props.onChangeHandler} />
                </label>
                <input type="submit"/>
            </form>
        );
    };
};