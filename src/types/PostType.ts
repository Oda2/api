const { gql } = require('apollo-server');

const PostType = gql`
  type Post {
    id: String
    text: String
    author: User
    likes: [Like]
    comments: [Comment]
    dateCreated: Date
    dateUpdated: Date
  }
  input PostCreate {
    text: String!
    authorId: String!
  }
  input PostUpdate {
    text: String!
    postId: String!
  }
  input PostDelete {
    postId: String!
  }
  input PostFilter {
    authorId: String
  }
  type Query {
    getPost(postId: String): Post
    listPosts(filter: PostFilter): [Post]
  }
  type Mutation {
    createPost(input: PostCreate!): Post
    updatePost(input: PostUpdate!): Post
    deletePost(input: PostDelete!): Boolean
  }
`;

export default PostType;
