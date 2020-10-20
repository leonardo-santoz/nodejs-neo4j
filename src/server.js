const express = require("express");
const neo4j = require("neo4j-driver");

const app = express();

const neo4j_driver = neo4j.driver(
  "bolt://neo4j+s://db-pgnuaxd3vf74xhslv0ca.graphenedb.com:24786",
  neo4j.auth.basic("neo4j", "neo4j")
);

const session = neo4j_driver.session();

app.listen("3333", () => {
  console.log("back-end started on port 3333 🚀");
});
