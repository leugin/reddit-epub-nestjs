import { credentials as s3Credentials } from './aws-credentials';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
const get = async (path: string): Promise<string|any> => {
  const streamToString = (stream) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
  return new Promise(async (success) => {
    const client = new S3Client({
      region: s3Credentials.region, // Cambia "us-east-1" por la región de tu bucket
      credentials: {
        accessKeyId: s3Credentials.credentials.accessKeyId,
        secretAccessKey: s3Credentials.credentials.secretAccessKey,
      },
    });
    const params = {
      Bucket: s3Credentials.bucket,
      Key: path,
    };

    const command = new GetObjectCommand(params);
    const response = await client.send(command);

    const { Body } = response;
    const json = await streamToString(Body);

    success(json);
  });
};

export default get;
