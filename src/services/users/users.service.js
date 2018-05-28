// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  // app.use('/users', createService(options));
  const users = createService(options);
  users.docs = {
    description: "A service for users",
    definitions: {
      messages: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
            description: "The user email address"
          },
          avatar: {
            type: "string",
            description: "The user url to his gravatar"
          }
        }
      }
    }
  };

  app.use("/users", users);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);
};
