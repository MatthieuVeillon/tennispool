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

class PlayerRanking extends Component {
  constructor() {
    super();
    this.state = { playersDB: [] };
  }

  componentDidMount() {
    this.GetPlayerName();
  }

  GetPlayerName = () => {
    database
      .ref("/players")
      .once("value")
      .then(data => this.setState({ playersDB: data.val() }));
  };

  displayPlayersInfo = () => {
    return Object.entries(this.state.playersDB).map(player => {
      return (
        <Tr>
          <Td>{Object.keys(player)}</Td>
          <Td>{Object.keys(player)}</Td>
          <Td>{Object.keys(player)}</Td>
          <Td>{Object.keys(player)}</Td>
          <Td>{Object.keys(player)}</Td>
          <Td>{Object.keys(player)}</Td>
        </Tr>
      );
    });
  };

  render() {
    return (
      <div>
        <Table>
          <Tr>
            <Th>Rank</Th>
            <Th>Player</Th>
            <Th>Points</Th>
            <Th>Team</Th>
            <Th>Salary</Th>
            <Th>Ratio</Th>
          </Tr>
          {this.displayPlayersInfo()}
        </Table>
      </div>
    );
  }
}

export default PlayerRanking;
