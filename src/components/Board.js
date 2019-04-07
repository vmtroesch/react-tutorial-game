import React from "react";
import Square from "./Square";

/**
 * React component for displaying a tic-tac-toe board.
 */

class Board extends React.Component {
  /**
   * Renders a Square.
   *
   * @param {number} i The index of the Square.
   * @return {object} Returns a React element.
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
   * @param {number} col The number of columns on the board.
   * @param {number} row The number of rows on the board.
   * @return {object} An array of rendered squares that comprise the board.
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
   * @return {object} Returns a React element.
   */

  render() {
    const numCols = 3;
    const numRows = 3;

    return <div>{this.createBoard(numCols, numRows)}</div>;
  }
}

export default Board;
