
import { Nullable, UserAvatar, S3Repository } from "@__feedback__/shared";
import { BucketRepository } from "../../../domain/s3/BucketRepository";


export class S3BucketRepository extends S3Repository implements BucketRepository {
  
  protected bucketName: string = 'cashier.linkk/users';
  
  public uploadAvatar(image: string, userId: string): Promise<string> {
    return this.upload(image, userId);
  }

  public async getAvatar(key: string): Promise<Nullable<UserAvatar>> {
    const avatar = await this.getObject(key);
    if (!avatar) {
      return null;
    }
    return new UserAvatar(avatar);
  }
}
