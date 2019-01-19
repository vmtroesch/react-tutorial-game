import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      reversed: false
    };
  }

  /* constructor(props) method:
   *
   * super(props) must be called before any other statement, otherwise this.props will be undefined in the constructor.
   *
   * In the constructor method, do not use setState(), instead directly assign a value using this.state = {prop: value}
   *
   * Do not directly assign props in to state as updates to prop will not be reflected in state causing bugs.
   *
   * Read more at https://reactjs.org/docs/react-component.html#constructor
   */

  handleClick(i) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: getLocation(i)
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  /* handleClick(i) method:
   *
   * We use the history preserving slice() method rather than concat() so as to be able to list a move history
   * and go back to previous Game states.
   *
   * The if statement is to handle clicks that should not alter the Game component's state.  Note the use of setState()
   * in this method rather than this.state = {prop: value} which should only be called in the constructor method.
   */

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  sortMoves() {
    this.setState({
      reversed: !this.state.reversed
    });
  }

  /* jumpTo(step) and sortMoves() methods
   *
   * jumpTo(step) uses setState() to move the state through the preserved Game history.
   *
   * sortMoves() allows the display of move history to be in either ascending or descending order by user preference.
   */

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winningLine } = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (history.length === 10 && this.state.stepNumber === 9) {
      status = "Draw game.";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    let moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" + move + " at " + history[move].location
        : "Go to game start";
      const className = move === this.state.stepNumber ? "bold" : "";
      return (
        <li key={move}>
          <button className={className} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    moves = this.state.reversed ? moves.reverse() : moves;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningLine={winningLine}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortMoves()}>Change Order</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  /* render() method:
   *
   * Updates the Game logic, checking for a winner and updating the Game's status to display the next player
   * or the game's result, either win or draw.
   *
   * Once game logic is updated, the Game's state is passed down as props to its child component, Board.
   */
}

const getLocation = move => {
  const location = {
    0: "(col 1, row 1)",
    1: "(col 2, row 1)",
    2: "(col 3, row 1)",
    3: "(col 1, row 2)",
    4: "(col 2, row 2)",
    5: "(col 3, row 2)",
    6: "(row 1, row 3)",
    7: "(col 2, row 3)",
    8: "(col 3, row 3)"
  };
  return location[move];
};

/* getLocation(move) function:
 *
 * A function that has been factored out which maps indexes in the Board (0, ...8) to (col, row) locations in order
 * to be displayed in the move history list.
 */

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };
    }
  }
  return { winner: null, winningLine: null };
};

/* calculateWinner(squares) function:
 *
 * A function that has been factored out which is part of the logic in determining if a player has
 * won the game or not.
 *
 * It also returns an array of the Board indices that won the game, so they can have
 * a special styling applied.
 */

export default Game;
