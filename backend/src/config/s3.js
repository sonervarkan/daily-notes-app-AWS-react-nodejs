// backend/src/config/s3.js

const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
});

const BUCKET = process.env.S3_BUCKET;

async function readNotes(userId) {
    const Key = `${userId}/notes.json`;

    try {
        const data = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key }));
        const body = await data.Body.transformToString();
        return JSON.parse(body);
    } catch (err) {
 
        return [];
    }
}

async function writeNotes(userId, notes) {
    const Key = `${userId}/notes.json`;

    await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key,
        Body: JSON.stringify(notes),
        ContentType: "application/json",
    }));
}

module.exports = { readNotes, writeNotes };
