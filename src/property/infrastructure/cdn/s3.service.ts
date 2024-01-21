import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class S3Service {
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  generateRandomFileName(file: Express.Multer.File): string {
    const randomString = crypto.randomBytes(16).toString('hex');
    const fileExtension = path.extname(file.originalname);
    const randomFileName = `${randomString}${fileExtension}`;
    return randomFileName;
  }

  async uploadFile(file) {
    return await this.s3_upload(
      file.buffer,
      process.env.AWS_BUCKET_NAME,
      this.generateRandomFileName(file),
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_DEFAULT_REGION,
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
