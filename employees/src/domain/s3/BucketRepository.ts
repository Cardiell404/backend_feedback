import { Nullable, UserAvatar } from "@__feedback__/shared";

export interface BucketRepository {
  uploadAvatar(image: string, userId: string): Promise<string>;
  getAvatar(key: string): Promise<Nullable<UserAvatar>>;
}
