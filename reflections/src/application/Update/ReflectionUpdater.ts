import { Reflection } from "../../domain/Reflection";
import { ReflectionAdditionalDetails } from "../../domain/ReflectionAdditionalDetails";
import { ReflectionDescription } from "../../domain/ReflectionDescription";
import { ReflectionId } from "../../domain/ReflectionId";
import { ReflectionRepository } from "../../domain/ReflectionRepository";
import { ReflectionTitle } from "../../domain/ReflectionTitle";


type Params = {
  reflectionId: ReflectionId;
  reflectionTitle?: ReflectionTitle;
  reflectionDescription?: ReflectionDescription;
  reflectionAdditionalDetails?: ReflectionAdditionalDetails;
  reflectionHidden?: boolean;
};


export class ReflectionUpdater {
  private repository: ReflectionRepository;

  constructor(repository: ReflectionRepository) {
    this.repository = repository;
  }

  async run({ reflectionId, reflectionTitle, reflectionDescription, reflectionAdditionalDetails, reflectionHidden }: Params): Promise<void> {
    const reflection = Reflection.update(reflectionId, reflectionTitle, reflectionDescription, reflectionAdditionalDetails, reflectionHidden);
    await this.repository.update(reflection);
  }
}
