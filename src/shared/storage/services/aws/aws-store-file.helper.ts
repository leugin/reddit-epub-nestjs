import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { credentials as s3Credentials } from './aws-credentials';
const makeClient = async () => {
  const configuration = {
    region: s3Credentials.region,
    credentials: s3Credentials.credentials,
    forcePathStyle: true,
    signatureVersion: 'v4',
  };
  const client = new S3Client(configuration);
  return Promise.resolve(client);
};
export const save = async (path: string, content: any) => {
  const client = await makeClient();
  return await client.send(
    new PutObjectCommand({
      Bucket: s3Credentials.bucket,
      Key: path,
      Body: Buffer.from(content),
    }),
  );
};

export default save;
