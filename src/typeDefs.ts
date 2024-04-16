const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        email: String
        posts: [Post]!
        comments: [Comment]!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        comments: [Comment]!
    }

    type Comment {
        id: ID!
        content: String!
        author: User!
        post: Post!
    }

    type Query {
        user: User!
    }
`;

export default typeDefs;
