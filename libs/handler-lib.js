// Wrapper around our Lambda functions
// Must be imported before we import anythinng else
// Adding errror handling that needs to be initialized when Lambda function is first invoked
export default function handler(lambda) {
  return async function (event, context) {
    let body, statusCode;

    try {
      // Run the Lambda within try/catch
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) {
      body = { error: e.message };
      statusCode = 500;
    }

    // Returnn HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
}