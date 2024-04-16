import models from "./db/models";

const resolvers = {
  Query: {
    user() {
      return models.User.findOne({});
    },
  },
};

export default resolvers;
