const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async(event) => {

    try {
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
            createdAt,
            done: false
        };

        //put the new task into DynamoDB
        await dynamoDb.put({
            TableName: 'TaskTable',
            Item:newTask
        }).promise();

        // return the new created task
        return {
            status: 200,
            body: JSON.stringify(newTask)
        };
    } catch (error) {
        console.log(error);
    };

};

module.exports = {
    addTask
};