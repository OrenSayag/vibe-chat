export const getMediaDownloadUrl = ({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}): string => {
  const minioEndpoint = process.env['MINIO_ENDPOINT'];
  if (!minioEndpoint) {
    throw new Error('MINIO_ENDPOINT environment variable is not set');
  }

  return `${minioEndpoint}/${bucket}/${key}`;
};
