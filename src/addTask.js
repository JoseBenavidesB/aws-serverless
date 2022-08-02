const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async(event) => {

    const { title, description } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    //connect to DynamoDB
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    //new task
    const newTask = {
        id,
        title,
        description,
        createdAt
    };

    //put the new task into DynamoDB
    await dynamoDb.put({
        TableName: 'TaskTable',
        Item:newTask
    }).promise();

    // return the new created task
    return {
        statusCode: 200,
        body: JSON.stringify(newTask)
    };

};

module.exports = {
    addTask
};