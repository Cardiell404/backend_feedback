import { UserAvatar, AggregateRoot, UserId } from '@__feedback__/shared';
import { UserEmail } from './value-objects/UserEmail';
import { UserName } from '../../Shared/domain/UserName';
import { UserPassword } from './value-objects/UserPassword';
import { UserRol } from './value-objects/UserRol';
import { Employee } from '../../Employees/domain/Employee';


export class User extends AggregateRoot {
  
  readonly id: UserId;
  readonly username?: UserName;
  readonly password?: UserPassword;
  readonly email?: UserEmail;
  readonly avatar?: UserAvatar;
  readonly rol?: UserRol;
  readonly employee?: Employee;
  readonly hidden?: boolean;
  readonly createdBy?: UserId;
  readonly createDate?: Date;

  constructor(id: UserId, username?: UserName, password?: UserPassword, email?: UserEmail, avatar?: UserAvatar, rol?: UserRol, hidden?: boolean, createdBy?: UserId, createDate?: Date, employee?: Employee ) {
    super();
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.avatar = avatar;
    this.rol = rol;
    this.employee = employee;
    this.hidden = hidden;
    this.createDate = createDate;
    this.createdBy = createdBy;
  }

  static create(id: UserId, username: UserName, userPassword: UserPassword, userEmail: UserEmail, rol: UserRol, hidden: boolean, createdBy: UserId, createDate: Date, employee: Employee, avatar?: UserAvatar): User {
    return new User(id, username, userPassword, userEmail, avatar, rol, hidden, createdBy, createDate, employee);
  }

  static update(id: UserId, username?: UserName, userPassword?: UserPassword, userEmail?: UserEmail, rol?: UserRol, hidden?: boolean, avatar?: UserAvatar): User {
    return new User(id, username, userPassword, userEmail, avatar, rol, hidden);
  }

  static fromPrimitives(plainData: { id: string; username: string; password: string, email: string, rol: string, hidden: boolean, createdBy: string, createDate: Date, avatar?: string }): User {
    return new User(
      new UserId(plainData.id),
      plainData.username ? new UserName(plainData.username) : undefined,
      plainData.password ? new UserPassword(plainData.password) : undefined,
      plainData.email ? new UserEmail(plainData.email) : undefined,
      plainData.avatar ? new UserAvatar(plainData.avatar) : undefined,
      plainData.rol ? new UserRol(plainData.rol) : undefined,
      plainData.hidden,
      plainData.createdBy ? new UserId(plainData.createdBy) : undefined,
      plainData.createDate
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      username: this.username?.value,
      password: this.password?.value,
      email: this.email?.value,
      avatar: this.avatar?.value,
      rol: this.rol?.toString(),
      hidden: this.hidden,
      createdBy: this.createdBy?.toString(),
      createDate: this.createDate,
      employee: this.employee?.toPrimitives()
    };
  }
}
