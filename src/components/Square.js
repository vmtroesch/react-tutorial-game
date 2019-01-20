import React from "react";

 /**
   * @description
   * Renders a React component.
   * 
   * @param {Object} props
   * @return {Object}
   */

const Square = props => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
