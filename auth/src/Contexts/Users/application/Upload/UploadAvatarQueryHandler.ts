import { Query } from "@__feedback__/shared";
import { UploadAvatar } from "./UploadAvatar";
import { UploadAvatarQuery } from "./UploadAvatarQuery";
import { UploadResponse } from "./UploadResponse";

export class UploadAvatarQueryHandler {
    constructor(private uploadAvatar: UploadAvatar) {}

    subscribedTo(): Query {
      return UploadAvatarQuery;
    }

    async handle(_query: UploadAvatarQuery): Promise<UploadResponse> {
      const {image, userId} = _query;
      return this.uploadAvatar.run(image, userId);
    }
}
