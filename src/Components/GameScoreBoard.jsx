import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import avtar01 from "../assets/avatar01.png";
import avtar02 from "../assets/avatar02.png";

class GameScoreBoard extends Component {
  render() {
    return (
      <>
        <Row>
          <Col className="score-board-header">
            {this.props.totalMatch} Games Tournament
          </Col>
        </Row>
        {this.props.isTournamentDraw ? (
          <Row className="text-center">
            <Col md={12} className="match-draw">
              Opps! Match Draw
            </Col>
          </Row>
        ) : null}
        <Row className={"text-center"}>
          {this.props.tournamentWinner ? (
            <>
              <Col md={12} className="congrats">
                Congratulation!
              </Col>
              <Col md={12} className="gameInfo">
                {this.props.matchWinner},you won tournament{" "}
              </Col>
            </>
          ) : this.props.matchWinner ? (
            <>
              <Col md={12} className="congrats">
                Congratulation!
              </Col>
              <Col md={12} className="gameInfo">
                {this.props.matchWinner},you won Game
                {this.props.currentPlayingGame}
              </Col>
            </>
          ) : (
            <Col className="gameInfo">
              Playing Game {this.props.currentPlayingGame}
            </Col>
          )}
        </Row>
        <Row className="profile-player01 py-2 my-2">
          <Col xs={3}>
            <div className="profile-pic-01">
              <img src={avtar01} alt="avtar01" />
            </div>
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={8} className="label">
                Player 01
              </Col>
              <Col xs={4} className="label text-center">
                Score
              </Col>
            </Row>
            <Row>
              <Col xs={8}>{this.props.player1Details.name}</Col>
              <Col xs={4} className="text-center">
                {this.props.player1Details.matchWon}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="profile-player02 py-2">
          <Col xs={3}>
            <div className="profile-pic-02">
              <img src={avtar02} alt="avtar02" />
            </div>
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={8} className="label">
                Player 02
              </Col>
              <Col xs={4} className="label text-center">
                Score
              </Col>
            </Row>
            <Row>
              <Col xs={8}>{this.props.player2Details.name}</Col>
              <Col xs={4} className="text-center">
                {this.props.player2Details.matchWon}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          {this.props.currentPlayingGame + 1 <= this.props.totalMatch ? (
            <Button
              color={"primary"}
              onClick={this.props.onNextGame}
              disabled={!this.props.matchWinner}
            >
              Next Game
            </Button>
          ) : (
            <Button
              color={"primary"}
              onClick={this.props.onPlayAgain}
              disabled={!this.props.tournamentWinner}
            >
              Play Again
            </Button>
          )}
        </div>
        <div className="text-center mt-2">
          <Button
            color={"primary"}
            outline={true}
            onClick={this.props.onEndTournament}
          >
            End Tournament
          </Button>
        </div>
      </>
    );
  }
}

export default GameScoreBoard;
