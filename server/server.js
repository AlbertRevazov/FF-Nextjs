require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const path = require("path");
const cors = require("cors");
const schema = require("./src/schema");
const root = require("./src/root");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);
app.listen(process.env.PORT, () => {
  console.log("server start ", process.env.PORT);
});
