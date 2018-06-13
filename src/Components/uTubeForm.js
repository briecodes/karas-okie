import React, { Component } from 'react';

import TextInput from './textInput';

export default class uTubeForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} >
                <label>Search YouTube: 
                    < TextInput value={this.props.value} name={this.props.name} onChangeHandler={this.props.onChangeHandler} />
                </label>
                {this.props.value ? <input type="submit"/> : null }
            </form>
        );
    };
};