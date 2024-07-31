import { EmployeeRepository } from './../../../Employees/domain/EmployeeRepository';
import { UserEmail } from '../../domain/value-objects/UserEmail';
import { UserPassword } from '../../domain/value-objects/UserPassword';
import { UserName } from '../../../Shared/domain/UserName';
import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { UserId, UserAvatar } from '@__feedback__/shared';
import { EmployeeNotExist } from '../../../Employees/domain/errors/EmployeeNotExist';
import { FiltersMapping } from '../../../../utils/FiltersMapping';
import { UserRol } from '../../domain/value-objects/UserRol';
import { UserAlreadyExists } from '../../domain/errors/UserAlreadyExists';
import { Employee } from '../../../Employees/domain/Employee';

type Params = {
   id: UserId;
   username: UserName;
   password: UserPassword;
   email: UserEmail;
   rol: UserRol;
   hidden: boolean;
   createdBy: UserId;
   createDate: Date;
   avatar?: UserAvatar;
};

export class UserCreator {

  constructor(private userRepository: UserRepository, private employeeRepository: EmployeeRepository) {
  }

  async run({ id, username, password, email, avatar, rol, hidden, createdBy, createDate }: Params): Promise<void> {

    const employee = await this.getEmployeeByEmailIfExist(email.value);
    await this.validateIfNotExistUser(email.value);
    const newUser = User.create(id, username, password, email, rol, hidden,createdBy, createDate, employee, avatar );
    await this.userRepository.save(newUser);
  }

  private async getEmployeeByEmailIfExist(email: string): Promise<Employee> {
    const employee = await this.employeeRepository.search(FiltersMapping.email(email));

    if ( !employee ) {
      throw new EmployeeNotExist();
    }

    return employee
  }

  private async validateIfNotExistUser(email: string): Promise<void> {
    const user = await this.userRepository.search(FiltersMapping.email(email));

    if ( user ) {
      throw new UserAlreadyExists(email);
    }
  }
}
