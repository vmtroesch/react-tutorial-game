import React from "react";
import Square from "./Square";

class Board extends React.Component {

  /**
   * @description
   * Renders a React component.
   * 
   * @param {Object} i The index of the square.
   * @return {Object} Returns an HTML element.
   */

  renderSquare(i) {
    const className =
      this.props.winningLine &&
      (this.props.winningLine[0] === i ||
        this.props.winningLine[1] === i ||
        this.props.winningLine[2] === i)
        ? "winnersquare"
        : "square";

    return (
      <Square
        className={className}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  /**
   * @description
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
   * @description
   * Renders the React component.
   * 
   * Read more at https://reactjs.org/docs/react-component.html#render
   * 
   * @return {Object} Returns an HTML element.
   */

  render() {
    const numCols = 3;
    const numRows = 3;

    return <div>{this.createBoard(numCols, numRows)}</div>;
  }
}

export default Board;
