import React, { Component } from "react";
import styled from "styled-components";
import firebase from "./FirebaseConfig.jsx";

const database = firebase.database();

const Formflex = styled.form`
  display: flex;
  height: 300px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const UploadConfirmation = styled.p`
  text-align: center;
  color: green;
`;

class AdminForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      poolName: "",
      user1: "",
      user2: "",
      user3: "",
      user4: "",
      warning: ""
    };

    this.state = this.initialState;
  }

  handleChange = (e, name) => {
    this.setState({ [name]: e.target.value });
  };

  clearState = () => {
    console.log("clearstates");
    this.setState({
      poolName: "",
      user1: "",
      user2: "",
      user3: "",
      user4: "",
      warning: ""
    });
  };

  uploadData = e => {
    e.preventDefault();
    console.log("upload");

    let usersToUpload = [
      this.state.user1,
      this.state.user2,
      this.state.user3,
      this.state.user4
    ];

    // check which state are emptty and populate a new object with the non empty ones (avoid empty key in firebase)
    const trueUsers = usersToUpload.filter(state => state != false);
    let toupload = {};
    trueUsers.map(name => (toupload[name] = ["no players yet"]));

    database
      .ref(`pools/${this.state.poolName}`)
      .set(toupload)
      .then(this.clearState)
      .then(() =>
        this.setState({ warning: "pool and users have been created" })
      );
  };

  render() {
    return (
      <div>
        <Formflex onSubmit={this.uploadData}>
          <label>
            Name of the Pool:
            <input
              type="text"
              value={this.state.poolName}
              onChange={e => this.handleChange(e, "poolName")}
            />
          </label>
          <label>
            User1:
            <input
              type="text"
              value={this.state.user1}
              onChange={e => this.handleChange(e, "user1")}
            />
          </label>
          <label>
            User2
            <input
              type="text"
              value={this.state.user2}
              onChange={e => this.handleChange(e, "user2")}
            />
          </label>
          <label>
            User3
            <input
              type="text"
              value={this.state.user3}
              onChange={e => this.handleChange(e, "user3")}
            />
          </label>
          <label>
            User4:
            <input
              type="text"
              value={this.state.user4}
              onChange={e => this.handleChange(e, "user4")}
            />
          </label>
          <input type="submit" value="Submit" />
        </Formflex>
        <UploadConfirmation>{this.state.warning}</UploadConfirmation>
      </div>
    );
  }
  n;
}

export default AdminForm;
