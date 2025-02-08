import { S3 } from '@aws-sdk/client-s3';
import { createMedia } from '@vibe-chat/db';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {
  private s3: S3;
  private bucket: string;
  constructor(private configService: ConfigService) {
    this.bucket = this.configService.getOrThrow('MINIO_BUCKET_NAME');

    this.s3 = new S3({
      endpoint: this.configService.getOrThrow('MINIO_ENDPOINT'),
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.configService.getOrThrow('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true, // Required for Minio
    });
  }

  async uploadMedia(file: Express.Multer.File) {
    console.log('Uploading file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    // Decode the filename that was encoded on the client side
    const decodedFilename = decodeURIComponent(file.originalname);
    const key = `${Date.now()}-${decodedFilename}`;

    await this.s3.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const { id } = await createMedia({
      key,
      bucket: this.bucket,
      mimeType: file.mimetype,
      size: file.size,
    });

    return { id };
  }
}
