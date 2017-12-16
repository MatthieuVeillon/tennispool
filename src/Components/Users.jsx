import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PlayerRanking from "./PlayerRanking.jsx";

import firebase from "./FirebaseConfig";

const database = firebase.database();

// Styled Components

const Flexcontainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`width: 100px;`;

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

class Users extends Component {
  constructor() {
    super();
    this.state = {
      pools: [],
      selectedValue: "",
      users: [],
      userArrayPoints: []
    };
  }

  componentDidMount() {
    database
      .ref("pools")
      .once("value")
      .then(data => this.setState({ pools: Object.keys(data.val()) }));
  }

  clearState = () => {
    this.setState({
      selectedValue: "",
      users: [],
      userArrayPoints: []
    });
  };

  handlePoolName = e => {
    this.clearState();
    this.setState({ selectedValue: e.target.value }, this.getPlayersByUser);
  };

  displayPoolsName = item => {
    return <option value={item}>{item}</option>;
  };

  getPlayersByUser = () => {
    database
      .ref(`pools/${this.state.selectedValue}`)
      .once("value")
      .then(data => {
        for (let item in data.val()) {
          this.setState({
            users: this.state.users.concat([item])
          });
          this.setState({ [item]: data.val()[item] });
        }
      })
      .then(this.makePlayersArray)
      .then(this.getUserPoints);
  };

  makePlayersArray = () => {
    this.state.users.map(user => {
      this.state[user] = this.state[user].split(",");
    });
  };

  getUserPoints = () => {
    this.state.users.map(user => {
      // Create the dynamic name of the state, 1 for each user
      let userPoints = `${user}points`;

      // initializing the state for userPoint to be at 0 for future calculation
      this.setState({ [userPoints]: 0 });

      let userCounter = 0;
      let promiseArrays = [];
      this.state[user].map(player => {
        let promise = database
          .ref(`players/${player}`)
          .child("points")
          .once("value")
          .then(data => {
            let points = parseInt(data.val());
            return (userCounter = userCounter + points);
          });
        promiseArrays.push(promise);
      });
      Promise.all(promiseArrays).then(() =>
        this.setState({
          userArrayPoints: this.state.userArrayPoints.concat({
            [user]: userCounter
          })
        })
      );
    });
  };

  sortArrayforUserRank = () => {
    this.state.users.map(user => {
      let userPoints = `${user}points`;
      this.setState(state => ({
        userArrayPoints: state.userArrayPoints.concat([
          { [user]: state[userPoints] }
        ])
      }));
    });
  };

  displayUserRanks = () => {
    this.state.userArrayPoints.sort(
      (a, b) => Object.values(b)[0] - Object.values(a)[0]
    );

    return this.state.userArrayPoints.map((object, index) => {
      return (
        <Tr>
          <Td>{index + 1}</Td>
          <Td>
            <Link
              to={`/users/${this.state.selectedValue}/${Object.keys(
                object
              )[0]}`}
            >
              {Object.keys(object)[0]}
            </Link>
          </Td>
          <Td>{Object.values(object)[0]} </Td>
        </Tr>
      );
    });
  };

  render() {
    return (
      <Flexcontainer>
        <h3>Please select your pool</h3>
        <Select
          value={this.state.SelectedValue}
          name="poolName"
          id=""
          onChange={this.handlePoolName}
        >
          {this.state.pools.map(this.displayPoolsName)}
        </Select>

        <Table>
          <Tr>
            <Th>Rank</Th>
            <Th>User</Th>
            <Th>Points</Th>
          </Tr>
          {this.displayUserRanks()}
        </Table>
        <PlayerRanking />
      </Flexcontainer>
    );
  }
}

export default Users;
