const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

const host = "localhost:7687";

const neo4j_driver = neo4j.driver(
  `bolt://${host}`,
  neo4j.auth.basic("neo4j", "neo4j@")
);

const session = neo4j_driver.session();

app.post("/users", (request, response) => {
  const { name } = request.body;
  console.log(name);

  session.run(`CREATE (u:User {name: '${name}'}) RETURN u`).then((result) => {
    const user = result.records;

    return response.json(user);
  });
});

app.get("/users", (request, response) => {
  session.run("MATCH(u:User) RETURN u.name, u.email").then((result) => {
    const users = result.records.map((res) => res._fields);

    return response.json(users);
  });
});

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  session
    .run(
      `MATCH (u:User) WHERE ID(u) = ${id}
         SET u.name = '${name}', u.email ='${email}'
         RETURN u
    `
    )
    .then((result) => {
      const user = result.records;

      return response.json(user);
    });
});

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;

  session
    .run(
      `MATCH (u:User) WHERE ID(u) = ${id}
          DELETE u
  `
    )
    .then(() => {
      return response.status(200).json({ message: "Deleted with successfull" });
    });
});

app.listen("3333", () => {
  console.log("back-end started on port 3333 🚀");
});
