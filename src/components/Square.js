import React from "react";

 /**
   * @description
   * Renders a React component.
   * 
   * @param {Object} props Properties are passed from parent components to children.
   * @return {Object} Returns an HTML element.
   */

const Square = props => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
