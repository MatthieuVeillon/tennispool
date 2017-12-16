const firebase = require("firebase");
const fs = require("fs");

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBS53SyoKArThFNKFD-sLtxdmCPRcuHVCw",
  authDomain: "pooltennis-1.firebaseapp.com",
  databaseURL: "https://pooltennis-1.firebaseio.com",
  projectId: "pooltennis-1",
  storageBucket: "pooltennis-1.appspot.com",
  messagingSenderId: "978466839727"
};
firebase.initializeApp(config);

const database = firebase.database();

let x = fs.readFileSync("DBplayers.json");
let players = JSON.parse(x);
let playersData = players.players;

console.log(playersData);

let populate = () => {
  playersData.map(data => {
    database
      .ref("players")
      .child(data.name)
      .set({
        points: data.points,
        url: data.url
      });
  });
};

populate();

const playersName = playersData.map(item => {
  return { value: item.name, label: item.name };
});

console.log(playersName);
