import { RabbitMQConnection, RabbitMQConfigurer, DomainEventSubscribers } from '@__feedback__/shared';
import container from '../dependency-injection';
import { RabbitMQConfig } from '../Contexts/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMQConnection>('Shared.RabbitMQConnection');
    const { name: exchange } = container.get<RabbitMQConfig>('Shared.RabbitMQConfig').exchangeSettings;
    await connection.connect();

    const configurer = container.get<RabbitMQConfigurer>('Shared.RabbitMQConfigurer');
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange, subscribers });
    await connection.close();
  }
}
