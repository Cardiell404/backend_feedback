import { CreateReflectionCommand } from './CreateReflectionCommand';
import { ReflectionCreator } from './ReflectionCreator';
import { ReflectionId } from '../domain/ReflectionId';
import { ReflectionTitle } from '../domain/ReflectionTitle';
import { ReflectionDescription } from '../domain/ReflectionDescription';
import { ReflectionAdditionalDetails } from '../domain/ReflectionAdditionalDetails';
import { UserId, Command, CommandHandler } from '@__feedback__/shared';

export class CreateReflectionCommandHandler implements CommandHandler<CreateReflectionCommand> {
    constructor(private reflectionCreator: ReflectionCreator) {}

    subscribedTo(): Command {
        return CreateReflectionCommand;
    }

    async handle(command: CreateReflectionCommand): Promise<void> {
        const reflectionId = new ReflectionId(command.id);
        const reflectionTitle = new ReflectionTitle(command.title);
        const reflectionCreateDate = command.createDate;
        const reflectionDescription = new ReflectionDescription(command.description);
        const reflectionCreatedBy = new UserId(command.createdBy);
        const reflectionAdditionalDetails = new ReflectionAdditionalDetails(command.additionalDetails);
        const reflectionHidden = command.hidden;
        await this.reflectionCreator.run({ reflectionId, reflectionTitle, reflectionDescription, reflectionCreatedBy, reflectionCreateDate, reflectionAdditionalDetails, reflectionHidden });
    }
}
