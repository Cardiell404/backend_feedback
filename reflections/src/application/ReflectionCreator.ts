import { UserId } from '@__feedback__/shared';
import { ReflectionDescription } from '../domain/ReflectionDescription';
import { Reflection } from '../domain/Reflection';
import { ReflectionTitle } from '../domain/ReflectionTitle';
import { ReflectionRepository } from '../domain/ReflectionRepository';
import { ReflectionId } from '../domain/ReflectionId';
import { ReflectionAdditionalDetails } from '../domain/ReflectionAdditionalDetails';

type Params = {
  reflectionId: ReflectionId;
  reflectionTitle: ReflectionTitle;
  reflectionDescription: ReflectionDescription;
  reflectionCreatedBy: UserId,
  reflectionCreateDate?: Date;
  reflectionAdditionalDetails: ReflectionAdditionalDetails;
  reflectionHidden: boolean;
};


export class ReflectionCreator {
  private repository: ReflectionRepository;

  constructor(repository: ReflectionRepository) {
    this.repository = repository;
  }

  async run({ reflectionId, reflectionTitle, reflectionDescription, reflectionCreatedBy, reflectionCreateDate, reflectionAdditionalDetails, reflectionHidden }: Params): Promise<void> {
    const reflection = Reflection.create(reflectionId, reflectionTitle, reflectionDescription, reflectionAdditionalDetails, reflectionCreatedBy, reflectionCreateDate, reflectionHidden);
    await this.repository.save(reflection);
  }
}
