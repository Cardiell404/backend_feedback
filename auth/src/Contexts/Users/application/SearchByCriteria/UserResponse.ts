import { Nullable } from "@__feedback__/shared";
import { User } from "../../domain/User";

export class UserResponse {

  readonly user: Nullable<User>;

  constructor(user: User) {
    this.user = user;
  }

  public toResponse() {
    return {
      id: this.user?.id.value,
      username: this.user?.username?.value,
      email: this.user?.email?.value,
      avatar: this.user?.avatar?.value,
      rol: this.user?.rol?.toString(),
      hidden: this.user?.hidden,
      createdBy: this.user?.createdBy?.toString(),
      createDate: this.user?.createDate,
    };
 }
}
