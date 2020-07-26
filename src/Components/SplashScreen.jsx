import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/online.png";
import four from "../assets/training.png";
import fourinarow from "../assets/4inarow.png";

class SplashScreen extends Component {
  gameMenu = () => {
    this.props.history.push("/game");
  };
  render() {
    return (
      <>
        <div className="min-100vh" id="splashScreen">
          <div id="splashScreenContent">
            <Row>
              <Col md={6} sm={"12"}>
                <div className="play-content h-100">
                  <div className="play text-center px-4 py-2 mt-2">
                    <div>
                      <i className="fa fa-play-circle text-white" />
                    </div>
                    <div className="text-dark">Play</div>
                  </div>
                </div>
              </Col>
              <Col md={6} sm="12" className="fourRow-image">
                <img src={fourinarow} className="four-in-a-row" alt="4inarow" />
              </Col>
            </Row>
            <Row>
              <Col sm="6" className="my-2">
                <Button color="primary" className="w-100" disabled={true}>
                  <div className="d-flex justify-content-center">
                    <img src={one} className="icon" alt="one" />
                    <span className="pl-1">Custom Game</span>
                  </div>
                </Button>
              </Col>
              <Col sm="6" className="my-2">
                <Button color="primary" className="w-100">
                  <div
                    className="d-flex justify-content-center"
                    onClick={() => this.gameMenu()}
                  >
                    <img src={two} className="icon" alt="two" />
                    <span className="pl-1">Two Players</span>
                  </div>
                </Button>
              </Col>
              <Col sm="6" className="my-2">
                <Button color="primary" className="w-100" disabled={true}>
                  <div className="d-flex justify-content-center">
                    <img src={three} className="icon" alt="online" />
                    <span className="pl-1">Game Online</span>
                  </div>
                </Button>
              </Col>
              <Col sm="6" className="my-2">
                <Button color="primary" className="w-100" disabled={true}>
                  <div className="d-flex justify-content-center">
                    <img src={four} className="icon" alt="training" />
                    <span className="pl-1">Training Game</span>
                  </div>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export default SplashScreen;
