import { BucketRepository } from '../../../Shared/domain/s3/BucketRepository';
import { UploadResponse } from './UploadResponse';


export class UploadAvatar {
  constructor(private repository: BucketRepository) {
    this.repository = repository;
  }

  async run( image: string, userId: string): Promise<UploadResponse> {
    const data = await this.repository.uploadAvatar(image, userId);
    return new UploadResponse(data);
  }
}
