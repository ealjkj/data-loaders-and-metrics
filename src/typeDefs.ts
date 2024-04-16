const typeDefs = `#graphql
    type User {
        id: ID!
    }

    type Query {
        user: User!
    }
`;

export default typeDefs;
