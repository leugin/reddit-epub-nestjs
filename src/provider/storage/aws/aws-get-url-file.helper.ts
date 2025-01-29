import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { credentials as s3Credentials} from './aws-credentials';
const createPresignedUrlWithClient = async (key: string) => {
  // Inicializa el cliente con la región y las credenciales
  const client = new S3Client({
    region: s3Credentials.region, // Cambia "us-east-1" por la región de tu bucket
    credentials: {
      accessKeyId: s3Credentials.credentials.accessKeyId,
      secretAccessKey: s3Credentials.credentials.secretAccessKey,
    },
  });

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  // Genera la URL prefirmada
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

export default createPresignedUrlWithClient;
