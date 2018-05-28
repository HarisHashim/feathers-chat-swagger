// Initializes the `messages` service on path `/messages`
const createService = require('feathers-nedb');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'messages',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  // app.use('/messages', createService(options));
  const messages = createService(options);
  messages.docs = {
    description: "A service to send and receive chat messages",
    definitions: {
      messages: {
        type: "object",
        required: ["text"],
        properties: {
          text: {
            type: "string",
            description: "The message text"
          },
          userId: {
            type: "string",
            description: "The id of the user that send the message"
          }
        }
      }
    }
  };

  app.use("/messages", messages);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('messages');

  service.hooks(hooks);
};
