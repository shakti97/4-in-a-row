import React from "react";
import GameCell from "./GameCell";


//TODO: Add draw when all cells are filled
export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.boardModel = [];
    this.state = {
      turn: this.props.turn,
      board: [],
    };
  }

  componentDidMount() {
    this.generateBoard();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPlayingGame !== this.props.currentPlayingGame) {
      this.setState(
        {
          turn: this.props.turn,
        },
        () => {
          this.generateBoard();
        }
      );
    }
  }

  generateModel() {
    let newboardmodel = [];
    for (let x = 0; x < 8; x++) {
      let newColumn = [];
      for (let y = 0; y < 8; y++) {
        newColumn.push(0);
      }
      newboardmodel.push(newColumn);
    }
    this.boardModel = newboardmodel;
  }

  generateBoard() {
    this.generateModel();
    let gameboard = [];

    for (let i = 0; i < 8; i++) {
      let newColumn = [];
      for (let k = 0; k < 8; k++) {
        newColumn.push(
          <GameCell
            indentifier={0}
            dropper={this.dropper}
            coordinate={[i, k]}
          ></GameCell>
        );
      }
      // console.log(newColumn)
      gameboard.push(<div className="box-row">{newColumn}</div>);
    }

    this.setState({
      board: gameboard,
    });
  }

  updateRenderFromModel() {
    let newBoardRender = [];

    for (let x = 0; x < this.boardModel.length; x++) {
      let newColumn = [];

      for (let y = 0; y < this.boardModel[x].length; y++) {
        if (this.boardModel[x][y] === 1) {
          newColumn.push(
            <GameCell
              identifier={1}
              dropper={this.dropper}
              coordinate={[x, y]}
            ></GameCell>
          );
        } else if (this.boardModel[x][y] === 2) {
          newColumn.push(
            <GameCell
              identifier={2}
              dropper={this.dropper}
              coordinate={[x, y]}
            ></GameCell>
          );
        } else {
          newColumn.push(
            <GameCell
              identifier={0}
              dropper={this.dropper}
              coordinate={[x, y]}
            ></GameCell>
          );
        }
      }
      //    console.log(newColumn)
      newBoardRender.push(<div className="box-row">{newColumn}</div>);
    }
    return newBoardRender;
  }

  dropper = (coordinates) => {
    if (!this.props.isMatchOver) {
      let landingcoordinates = [];
      for (let y = 0; y < this.boardModel[coordinates[0]].length; y++) {
        if (this.boardModel[coordinates[0]][y] === 0) {
          this.boardModel[coordinates[0]][y] = this.state.turn ? 1 : 2;
          landingcoordinates.push(coordinates[0]);
          landingcoordinates.push(y);
          break;
        }
      }
      // this.boardModel[coordinates[0]][coordinates[1]] = this.state.turn ? 1 : 2;
      // console.log(this.boardModel[8,8])
      if (
        this.checkpositiveDiagonal(
          landingcoordinates,
          this.state.turn ? 1 : 2
        ) === true
      ) {
        this.setState({
          board: this.updateRenderFromModel(),
        });
        return this.props.matchOver(this.state.turn ? 1 : 2);
      } else if (
        this.checkhorizontal(landingcoordinates, this.state.turn ? 1 : 2) ===
        true
      ) {
        this.setState({
          board: this.updateRenderFromModel(),
        });
        return this.props.matchOver(this.state.turn ? 1 : 2);
      } else if (
        this.checkvertical(landingcoordinates, this.state.turn ? 1 : 2) === true
      ) {
        this.setState({
          board: this.updateRenderFromModel(),
        });
        return this.props.matchOver(this.state.turn ? 1 : 2);
      } else if (
        this.checknegativeDiagonal(
          landingcoordinates,
          this.state.turn ? 1 : 2
        ) === true
      ) {
        this.setState({
          board: this.updateRenderFromModel(),
        });
        return this.props.matchOver(this.state.turn ? 1 : 2);
      } else {
        this.setState((prev) => {
          return {
            board: this.updateRenderFromModel(),
            turn: !prev.turn,
          };
        });
      }
    }
  };

  calculateWinTracker = (arrayOfDiagonalCoordinates, identifier) => {
    let winTracker = 0;
    for (let i = 0; i < arrayOfDiagonalCoordinates.length; i++) {
      let coordinate = arrayOfDiagonalCoordinates[i];
      if (this.boardModel[coordinate[0]][coordinate[1]] === identifier) {
        winTracker += 1;
        if (winTracker === 4) {
          return true;
        }
      } else {
        winTracker = 0;
      }
    }
    return false;
  };

  checkpositiveDiagonal(coordinates, identifier) {
    let arrayOfDiagonalCoordinates = [];
    let a = coordinates[0];
    let b = coordinates[1];
    while (a > 0 && b < 7) {
      a = a - 1;
      b = b + 1;
      arrayOfDiagonalCoordinates.push([a, b]);
    }
    arrayOfDiagonalCoordinates.reverse();
    arrayOfDiagonalCoordinates.push([coordinates[0], coordinates[1]]);
    a = coordinates[0];
    b = coordinates[1];
    while (a < 7 && b > 0) {
      a = a + 1;
      b = b - 1;
      arrayOfDiagonalCoordinates.push([a, b]);
    }
    return this.calculateWinTracker(arrayOfDiagonalCoordinates, identifier);
  }

  checknegativeDiagonal(coordinates, identifier) {
    let arrayOfDiagonalCoordinates = [];
    let a = coordinates[0];
    let b = coordinates[1];
    while (a > 0 && b > 0) {
      a = a - 1;
      b = b - 1;
      arrayOfDiagonalCoordinates.push([a, b]);
    }
    arrayOfDiagonalCoordinates.reverse();
    arrayOfDiagonalCoordinates.push([coordinates[0], coordinates[1]]);
    a = coordinates[0];
    b = coordinates[1];
    while (a < 7 && b < 7) {
      a = a + 1;
      b = b + 1;
      arrayOfDiagonalCoordinates.push([a, b]);
    }
    return this.calculateWinTracker(arrayOfDiagonalCoordinates, identifier);
  }

  checkhorizontal(coordinates, identifier) {
    let wintracker = 0;
    for (let i = 0; i < 8; i++) {
      if (this.boardModel[i][coordinates[1]] === identifier) {
        wintracker += 1;
        if (wintracker === 4) {
          return true;
        }
      } else {
        wintracker = 0;
      }
    }
    return false;
  }

  checkvertical(coordinates, identifier) {
    let wintracker = 0;
    for (let i = 0; i < 8; i++) {
      if (this.boardModel[coordinates[0]][i] === identifier) {
        wintracker += 1;
        if (wintracker === 4) {
          return true;
        }
      } else {
        wintracker = 0;
      }
    }
    return false;
  }

  render() {
    return <div className="play-box">{this.state.board}</div>;
  }
}
