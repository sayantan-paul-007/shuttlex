import { GraphQLClient } from "graphql-request";

const endpoint = "https://api.spacexdata.com/v4/";

export const gqlClient = new GraphQLClient(endpoint);