export const credentials = {
  region: process.env.AWS_BUCKET_REGION
    ? process.env.AWS_BUCKET_REGION
    : 'us-east-1',
  bucket: process.env.AWS_BUCKET_NAME,
  maxAttempts: 3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
