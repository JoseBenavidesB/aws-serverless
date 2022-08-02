const { AWS } = require('aws-sdk');

const getTask = async (event) => {
    try {
        const { id } = event.pathParameters;
        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamoDb.get({
            TableName: 'TaskTable',
            Key: {
                id
            }
        }).promise();

        const task = result.Item;

        return {
            status: 200,
            body: { task }
        }
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getTask
}