const { AWS } = require('aws-sdk');


const updateTask = async (event) => {

    try {
        const dynamoDb = AWS.DynamoDB.DocumentClient();
        const {id} = event.pathParameters;
        const { done } = JSON.parse(event.body)

        const result = await dynamoDb.update({
            TableName: 'TaskTable',
            Key: {id},
            UpdateExpression: 'set done = :done',
            ExpressionAttributeValues: {
                ':donde': done
            },
            ReturnValues: 'ALL_NEW'
        }).promise();


        return {
            status:200,
            body: JSON.stringify({
                msg: "Task updated successfully"
            })
        };
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    updateTask
}