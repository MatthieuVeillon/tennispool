import React, { Component } from "react";
import firebase from "./FirebaseConfig";
import styled from "styled-components";

const database = firebase.database();

// Styled Components

const Flexcontainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Table = styled.table`
   {
    margin-top: 30px;
    border-collapse: collapse;
    width: 500px;
  }
`;

const Th = styled.th`
   {
    background-color: #4caf50;
    color: white;
    text-align: left;
    padding: 8px;
    font-weight: 300;
  }
`;

const Td = styled.td`
   {
    text-align: left;
    padding: 8px;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

class User extends Component {
  constructor() {
    super();
    this.state = { players: [] };
    this.state = { playersPoints: [] };
  }

  componentDidMount() {
    this.getPlayersNameAndPoints();
  }

  getPlayersNameAndPoints = () => {
    database
      .ref(`/pools/${this.props.poolName}/${this.props.userName}`)
      .once("value")
      .then(data => {
        let playersName = data.val().split(",");
        return playersName;
      })
      .then(playersName => {
        // based on the names obtained - we look for their points in the DB and populate a state with names and points
        playersName.map(playerName => {
          return database
            .ref(`/players/${playerName}`)
            .child("points")
            .once("value")
            .then(data =>
              this.setState(previousState => ({
                playersPoints: previousState.playersPoints.concat({
                  [playerName]: data.val()
                })
              }))
            );
        });
      });
  };

  displayPlayers = () => {
    // sort the state to display the bigger number first
    this.state.playersPoints.sort(
      (a, b) => Object.values(b)[0] - Object.values(a)[0]
    );
    return this.state.playersPoints.map(player => {
      return (
        <Tr>
          <Td>{Object.keys(player)[0]}</Td>
          <Td>{Object.values(player)[0]} </Td>
        </Tr>
      );
    });
  };

  render() {
    return (
      <Flexcontainer>
        Hello user
        <Table>
          <Tr>
            <Th>Player</Th>
            <Th>Points</Th>
          </Tr>
          {this.displayPlayers()}
        </Table>
      </Flexcontainer>
    );
  }
}

export default User;
