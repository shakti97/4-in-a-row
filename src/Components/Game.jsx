import React, { Component } from "react";
import GameBoard from "./GameBoard/GameBoard";
import GameScoreBoard from "./GameScoreBoard";

const checkForTurn = (lastturn, whoStarts, lastTime) => {
  switch (whoStarts) {
    case 0: {
      return !lastTime;
    }
    case 1: {
      return !lastturn;
    }
    case 2: {
      return lastturn;
    }
    case 3: {
      return true;
    }
    case 4: {
      return false;
    }
    default: {
    }
  }
};
class Game extends Component {
  state = {
    totalMatch: this.props.numberOfGame,
    currentPlayingGame: 1,
    player1Details: {
      matchWon: 0,
      name: this.props.playerOneName,
    },
    player2Details: {
      matchWon: 0,
      name: this.props.playerTwoName,
    },
    tournamentWinner: "",
    matchWinner: "",
    turn: true,
    lastTurn: true,
    whoStarts: this.props.whoStarts,
    isTournamentDraw: "",
  };
  matchOver = (identifier) => {
    let { player1Details, player2Details, matchWinner, turn } = this.state;
    if (identifier === 1) {
      player1Details.matchWon = player1Details.matchWon + 1;
      matchWinner = player1Details.name;
      turn = true;
    } else {
      player2Details.matchWon = player2Details.matchWon + 1;
      matchWinner = player2Details.name;
      turn = false;
    }
    this.setState(
      {
        player1Details,
        player2Details,
        matchWinner,
        turn,
      },
      () => {
        if (this.state.currentPlayingGame === this.state.totalMatch) {
          this.tournamentOver();
        }
      }
    );
  };
  tournamentOver = () => {
    let { player1Details, player2Details, isTournamentDraw } = this.state;
    let tournamentWinner;
    if (player1Details.matchWon > player2Details.matchWon) {
      tournamentWinner = player1Details.name;
    } else if (player1Details.matchWon === player2Details.matchWon) {
      isTournamentDraw = "Draw";
    } else {
      tournamentWinner = player2Details.name;
    }
    this.setState({
      tournamentWinner,
      isTournamentDraw,
    });
  };
  onNextGame = () => {
    const { currentPlayingGame, turn, whoStarts, lastTurn } = this.state;
    this.setState({
      currentPlayingGame: currentPlayingGame + 1,
      turn: checkForTurn(turn, whoStarts, lastTurn),
      lastTurn: checkForTurn(turn, whoStarts, lastTurn),
      matchWinner: "",
    });
  };

  onPlayAgain = () => {
    this.setState({
      totalMatch: this.props.numberOfGame,
      currentPlayingGame: 1,
      player1Details: {
        matchWon: 0,
        name: this.props.playerOneName,
      },
      player2Details: {
        matchWon: 0,
        name: this.props.playerTwoName,
      },
      tournamentWinner: "",
      matchWinner: "",
      turn: true,
      lastTurn: true,
      whoStarts: this.props.whoStarts,
    });
  };
  render() {
    return (
      <div>
        <div className="row bg-white border-gray rounded py-3">
          <div className="col-sm-7">
            <GameBoard
              matchOver={this.matchOver}
              turn={this.state.turn}
              currentPlayingGame={this.state.currentPlayingGame}
              isMatchOver={
                this.state.matchWinner || this.state.tournamentWinner
              }
            />
          </div>
          <div className="col-sm-5">
            <GameScoreBoard
              tournamentWinner={this.state.tournamentWinner}
              matchWinner={this.state.matchWinner}
              totalMatch={this.state.totalMatch}
              currentPlayingGame={this.state.currentPlayingGame}
              player1Details={this.state.player1Details}
              player2Details={this.state.player2Details}
              onNextGame={this.onNextGame}
              onEndTournament={this.props.toggleGame}
              onPlayAgain={this.onPlayAgain}
              isTournamentDraw={this.state.isTournamentDraw}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
