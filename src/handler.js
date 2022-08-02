"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello Everyone, Im happy share this little project with you",
        input: event,
      },
      null,
      2
    ),
  };
};
