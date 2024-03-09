const { buildSchema } = require("graphql");

const schema = buildSchema(`
    
    type User {
      name: String,
      lastName: String,
      phone: String,
      email: String,
      password: String,
      role: String,
      image: String,
      favouriteName: String,
      favouriteApiId: String,
      token:String,
      message:String,
    }

    input UserInput {
        name: String!,
        lastName: String!,
        phone: String!,
        email: String!,
        password: String!,
        role: String,
        image: String,
        favouriteName: String,
        favouriteApiId: String,
    }

    input UserLoginInput{
      email: String,
      password: String,
    }

    type Query {
        getMe(token: String): User
        getUserLogin(input:UserLoginInput): User
    }

    type Mutation {
        createUser(input: UserInput): User
    }

`);

module.exports = schema;
