import React from 'react';
const Input = (props) => (  
    <div className="inputDiv">
      {props.onChangeHandler ? <input type="text" onChange={props.onChangeHandler} name={props.name} value={props.value} /> : <input value={props.value} type="text" name={props.name} />}
    </div>
);
export default Input;