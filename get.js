import handler from "./libs/handler-lib";
import dynamodb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sorrt key of the item to be retrieved
    Key: {
      userId: "123", // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const results = await dynamodb.get(params);
  if (!results.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return results.Item;

});