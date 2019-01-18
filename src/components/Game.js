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
}

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
}

export default Game;
