import { SendReflection } from './../../domain/Send/SendReflection';
import { UserId } from "@__feedback__/shared";
import { ReflectionId } from "../../domain/ReflectionId";
import { ReflectionRepository } from "../../domain/ReflectionRepository";
import { ReflectionMessage } from "../../domain/ReflectionMessage";

type Params = {
  reflectionId: ReflectionId;
  reflectionMessage: ReflectionMessage;
  reflectionUserId: UserId
  reflectionCreateDate?: Date;
};


export class SendReflectionCreator {
  private repository: ReflectionRepository;

  constructor(repository: ReflectionRepository) {
    this.repository = repository;
  }

  async run({ reflectionId, reflectionMessage, reflectionCreateDate, reflectionUserId }: Params): Promise<void> {
    const sendReflection = SendReflection.create(reflectionId,reflectionMessage,reflectionUserId, reflectionCreateDate);
    await this.repository.send(sendReflection);
  }
}
