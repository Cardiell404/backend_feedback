import { Command, CommandHandler } from "@__feedback__/shared";
import { ReflectionAdditionalDetails } from "../../domain/ReflectionAdditionalDetails";
import { ReflectionDescription } from "../../domain/ReflectionDescription";
import { ReflectionId } from "../../domain/ReflectionId";
import { ReflectionTitle } from "../../domain/ReflectionTitle";
import { ReflectionUpdater } from "./ReflectionUpdater";
import { UpdateReflectionCommand } from "./UpdateReflectionCommand";


export class UpdateReflectionCommandHandler implements CommandHandler<UpdateReflectionCommand> {
    constructor(private reflectionUpdater: ReflectionUpdater) {}

    subscribedTo(): Command {
        return UpdateReflectionCommand;
    }

    async handle(command: UpdateReflectionCommand): Promise<void> {
        const reflectionId = new ReflectionId(command.id);
        const reflectionTitle = command.title ? new ReflectionTitle(command.title) : undefined;
        const reflectionDescription = command.description ? new ReflectionDescription(command.description) : undefined;
        const reflectionAdditionalDetails = command.additionalDetails ? new ReflectionAdditionalDetails(command.additionalDetails) : undefined;
        const reflectionHidden = command.hidden;
        await this.reflectionUpdater.run({ reflectionId, reflectionTitle, reflectionDescription, reflectionAdditionalDetails, reflectionHidden });
    }
}
