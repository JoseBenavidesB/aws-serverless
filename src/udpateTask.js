const { AWS } = require('aws-sdk');


const updateTask = async (event) => {

    try {
        const dynamoDb = AWS.DynamoDB.DocumentClient();
        const {id} = event.pathParameters;
        const { done, title, description } = JSON.parse(event.body)

        const result = await dynamoDb.update({
            TableName: 'TaskTable',
            Key: {id},
            UpdateExpression: 'set done = :done, title= :title, description= :description',
            ExpressionAttributeValues: {
                ':donde': done,
                ':title': title,
                ':description': description
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