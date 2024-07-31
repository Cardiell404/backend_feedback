import { DomainEventSubscribers, EventBus, RabbitMQConnection } from '@__feedback__/shared';
import container from './dependency-injection';
import { Server } from './server';

export class AuthBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const rabbitMQConnection = container.get<RabbitMQConnection>('Shared.RabbitMQConnection');
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('Shared.domain.EventBus');
    const rabbitMQConnection = container.get<RabbitMQConnection>('Shared.RabbitMQConnection');
    await rabbitMQConnection.connect();
    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
