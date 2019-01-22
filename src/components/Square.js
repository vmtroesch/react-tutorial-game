import React from "react";

/**
 * @description
 * Renders the React component.
 *
 * @param {Object} props Properties are passed from parent components to children.
 * @return {Object} Returns a React component.
 */

const Square = props => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
