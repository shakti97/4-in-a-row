import React, { Component } from "react";
import avtar01 from "../assets/avatar01.png";
import avtar02 from "../assets/avatar02.png";
import avtar03 from "../assets/winner.png";
import avtar04 from "../assets/run.png";
import CustomModal from "./CustomModal";
import Game from "./Game";
import { Button } from "reactstrap";

const numberOfGameOptions = [
  { label: "2 Games", value: 2 },
  { label: "3 Games", value: 3 },
  { label: "5 Games", value: 5 },
  { label: "10 Games", value: 10 },
];
export const whoStartsOptions = [
  { label: "Alternate turn", value: 0 },
  { label: "Looser first", value: 1 },
  { label: "Winner first", value: 2 },
  { label: "Always player 01", value: 3 },
  { label: "Always player 02", value: 4 },
];

const initialState = {
  playerOneName: "",
  playerTwoName: "",
  numberOfGame: 2,
  whoStarts: 0,
  showModal: false,
  modalInfo: {
    id: "whoStarts",
    modalTitle: "Who Starts",
    options: whoStartsOptions,
    value: 2,
  },
};
class GamePanel extends Component {
  componentWillMount = () => {
    this.setState(initialState);
  };

  handleRadioOption = (inputName) => {
    let modalInfo;
    if (inputName === "noOfGames") {
      modalInfo = {
        id: "numberOfGame",
        modalTitle: "No of Games",
        options: numberOfGameOptions,
        value: this.state.numberOfGame,
      };
    } else {
      modalInfo = {
        id: "whoStarts",
        modalTitle: "Who Starts",
        options: whoStartsOptions,
        value: this.state.whoStarts,
      };
    }
    this.setState({
      showModal: true,
      modalInfo,
    });
  };

  saveValue = (modalInfo, value) => {
    this.setState(
      {
        [modalInfo.id]: value,
      },
      () => {
        this.toggleModal();
      }
    );
  };

  toggleModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log("change ", this.state);
      }
    );
  };

  toggleGame = () => {
    this.setState(
      {
        isGameStarted: !this.state.isGameStarted,
      },
      () => {
        if (!this.state.isGameStarted) {
          this.setState(initialState);
        }
      }
    );
  };
  render() {
    const {
      whoStarts,
      isGameStarted,
      numberOfGame,
      showModal,
      modalInfo,
    } = this.state;
    console.log("isGameStarted ", isGameStarted);
    let whoStartsValue = whoStartsOptions.find(
      (option) => option.value === whoStarts
    ).label;
    return (
      <>
        {!isGameStarted ? (
          <div id="gamePanel">
            <div className="custom-card">
              {/* TODO: create custom-row a separate component and reuse the same
            component */}
              <div className="custom-row profile-player01">
                <div className="profile-pic-01">
                  <img src={avtar01} alt="avtar01" />
                </div>
                <div className="custom-input-form">
                  <div className="player-label">Player 01</div>
                  <div className="player-01-name">
                    <input
                      type="text"
                      name="playerOneName"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <hr className="horizontal-line" />
              </div>
              <div className="custom-row profile-player02">
                <div className="profile-pic-02">
                  <img src={avtar02} alt="avtar02" />
                </div>
                <div className="custom-input-form ">
                  <div className="player-label">Player 02</div>
                  <div className="player-02-name">
                    <input
                      type="text"
                      name="playerTwoName"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <hr className="horizontal-line" />
              </div>
              <div className="custom-row number-of-game">
                <div className="profile-pic-03">
                  <img src={avtar03} alt="avtar03" />
                </div>
                <div className="custom-input-form ">
                  <div className="player-label">No of Games</div>
                  <div className="player-03-name">
                    <div
                      className="radioOptions"
                      onClick={() => this.handleRadioOption("noOfGames")}
                    >
                      {numberOfGame}
                    </div>
                  </div>
                </div>
                <hr className="horizontal-line" />
              </div>
              <div className="custom-row who-starts">
                <div className="profile-pic-04">
                  <img src={avtar04} alt="avtar04" />
                </div>
                <div className="custom-input-form ">
                  <div className="player-label">Who starts</div>
                  <div className="player-04-name">
                    <div
                      className="radioOptions"
                      onClick={() => this.handleRadioOption("whoStarts")}
                    >
                      {whoStartsValue}
                    </div>
                  </div>
                </div>
                <hr className="horizontal-line" />
              </div>
              <hr />
              <div>
                <Button
                  color={"primary"}
                  className="start-game"
                  disabled={
                    !this.state.playerOneName || !this.state.playerTwoName
                  }
                  onClick={() => this.toggleGame()}
                >
                  Start Game
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div id={"gamePanel"}>
            <Game {...this.state} toggleGame={this.toggleGame} />
          </div>
        )}
        {this.state.showModal ? (
          <CustomModal
            isOpen={showModal}
            toggle={this.toggleModal}
            className={"custom-modal"}
            modalInfo={modalInfo}
            saveValue={this.saveValue}
          />
        ) : null}
      </>
    );
  }
}

export default GamePanel;
