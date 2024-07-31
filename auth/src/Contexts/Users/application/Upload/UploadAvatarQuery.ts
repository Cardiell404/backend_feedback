import { Query } from "@__feedback__/shared";

type Params = {
  image: string;
  userId: string;
};

export class UploadAvatarQuery extends Query {
    image: string;
    userId: string;

    constructor({ image, userId }: Params) {
        super();
        this.image = image;
        this.userId = userId;
    }
}
