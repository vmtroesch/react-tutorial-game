import React from "react";

/**
 * React component for displaying a tic-tac-toe board.
 */

class Board extends React.Component {
  /**
   * Renders a Square.
   *
   * @param {Object} i The index of the Square.
   * @return {Object} Returns a React element.
   */

  renderSquare(i) {
    const className =
      this.props.winningLine &&
      (this.props.winningLine[0] === i ||
        this.props.winningLine[1] === i ||
        this.props.winningLine[2] === i)
        ? "winning square"
        : "square";

    return (
      <Square
        className={className}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  /**
   * Creates the board programmatically.
   *
   * @param {Object} col The number of columns on the board.
   * @param {Object} row The number of rows on the board.
   * @return {Object} An array of rendered squares that comprise the board.
   */

  createBoard(col, row) {
    let board = [];
    let count = 0;

    for (let i = 0; i < row; i++) {
      let rows = [];
      for (let j = 0; j < col; j++) {
        rows.push(this.renderSquare(count++));
      }
      board.push(
        <div key={i} className="board-row">
          {rows}
        </div>
      );
    }
    return board;
  }

  /**
   * Renders the React component.
   *
   * Read more at https://reactjs.org/docs/react-component.html#render
   *
   * @return {Object} Returns a React element.
   */

  render() {
    const numCols = 3;
    const numRows = 3;

    return <div>{this.createBoard(numCols, numRows)}</div>;
  }
}

/**
 * React function component for rendering a square on the game board.
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

export default Board;
