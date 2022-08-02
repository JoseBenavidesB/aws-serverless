const { AWS } = require('aws-sdk');


const getTasks = async (event) => {

    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamoDb.scan({
            TableName: 'TaskTable'
        }).promise();

        const tasks = result.Items;

        return {
            status: 200,
            body: {tasks}
        }
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    getTasks
}