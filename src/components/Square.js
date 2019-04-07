import React from "react";

/**
 * React function component for rendering a square on the game board.
 *
 * @param {object} props Properties are passed from parent components to children.
 * @return {object} Returns a React component.
 */

const Square = props => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
