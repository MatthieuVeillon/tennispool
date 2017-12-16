import React, { Component } from "react";
import firebase from "./FirebaseConfig";
import Select from "react-select";
import "react-select/dist/react-select.css";
import styled from "styled-components";

// import { playersName } from "../backend/scriptDB.js";

const database = firebase.database();

class AdminUsers extends Component {
  constructor() {
    super();

    this.state = {
      pools: [],
      selectedValue: "",
      users: []
    };
  }
  handlePoolName = e => {
  
    this.setState({ selectedValue: e.target.value }, this.getUsersNames);
  };

  handlePlayersName = (e, item) => {
    this.setState({ [item]: e });
  };

  getUsersNames = () => {
    if (this.state.selectedValue)
      database
        .ref(`pools/${this.state.selectedValue}`)
        .once("value")
        .then(data => this.setState({ users: Object.keys(data.val()) }));
  };

  componentDidMount() {
    database
      .ref("pools")
      .once("value")
      .then(data => this.setState({ pools: Object.keys(data.val()) }));

    this.generatePlayersName();
  }

  displayPoolsName = item => {
    return <option value={item}>{item}</option>;
  };

  submitPlayers = e => {
    e.preventDefault();
    this.state.users.map(this.uploadPlayersToDB);
  };

  uploadPlayersToDB = item => {
    database
      .ref(`pools/${this.state.selectedValue}/${item}`)
      .set(this.state[item]);
  };

  displayUserNames = item => {
    return (
      <Select
        name="item"
        multi
        simpleValue={true}
        value={this.state[item]}
        onChange={e => this.handlePlayersName(e, item)}
        options={this.state.playersToSelect}
      />
    );
  };

  generatePlayersName = () => {
    database
      .ref("players")
      .once("value")
      .then(data => this.setState({ players: Object.keys(data.val()) }))
      .then(() =>
        this.state.players.map(item => {
          return { value: item, label: item };
        })
      )
      .then(result =>
        this.setState({
          playersToSelect: result
        })
      );
  };

  render() {
    return (
      <div>
        <h3>Please select your pool</h3>
        <select
          value={this.state.selectedValue}
          name="poolName"
          id=""
          onChange={this.handlePoolName}
        >
          {this.state.pools.map(this.displayPoolsName)}
        </select>
        <form onSubmit={this.submitPlayers}>
          {this.state.users.map(this.displayUserNames)}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AdminUsers;
