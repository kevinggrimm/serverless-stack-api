import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {

  // HTTP request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // Attributes of the item to be created
      userId: "123", // id of the author
      noteId: uuid.v1(), // unique uuid
      content: data.content, // parsed from request body
      attachment: data.attachment, // parsed from request body
      createdAt: Date.now(), // Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});