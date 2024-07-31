import { ContainerBuilder, Definition, YamlFileLoader } from "node-dependency-injection"
import { MongoClientFactory, S3ClientFactory, WinstonLogger, CommandHandlers, InMemoryCommandBus, QueryHandlers, InMemoryQueryBus,
         JwtFactory, JwtMiddleware, CryptoFactory, RabbitMQConnection, RabbitMQqueueFormatter, RabbitMQConfigurer, DomainEventFailoverPublisher,
        } from '@__feedback__/shared';
import { S3ConfigFactory } from "../../Contexts/Shared/infrastructure/bucket/s3/S3ConfigFactory";
import { JwtConfigFactory } from "../../Contexts/Shared/infrastructure/jwt/JwtConfigFactory";
import { MongoConfigFactory } from "../../Contexts/Shared/infrastructure/persistence/mongo/MongoConfigFactory";
import { RabbitMQConfigFactory } from "../../Contexts/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory";
import { RabbitMQEventBusFactory } from "../../Contexts/Shared/infrastructure/RabbitMQ/RabbitMQEventBusFactory";


const sharedContainer = new ContainerBuilder();
sharedContainer.setDefinition('Shared.JwtConfig', createDefinition({object: JwtConfigFactory, method: 'createConfig'}));
sharedContainer.setDefinition('Shared.JwtManager', createDefinition({object: JwtFactory, args: [sharedContainer.get("Shared.JwtConfig")] }), )

const loader = new YamlFileLoader(sharedContainer);
loader.load(`${__dirname}/application.yaml`);


sharedContainer.setDefinition('Shared.S3Config', createDefinition({object: S3ConfigFactory, method: 'createConfig'}));
sharedContainer.setDefinition('Shared.MongoConfig', createDefinition({object: MongoConfigFactory, method: 'createConfig'}));
sharedContainer.setDefinition('Shared.RabbitMQConfig', createDefinition({object: RabbitMQConfigFactory, method: 'createConfig'}));
sharedContainer.setDefinition('Shared.ConnectionManager', createDefinition({ object: MongoClientFactory, method: "createClient", args: ["feedback", sharedContainer.get("Shared.MongoConfig")]}))
sharedContainer.setDefinition('Shared.BucketManager', createDefinition({ object: S3ClientFactory, method: "createClient", args: ["us-west-1", sharedContainer.get("Shared.S3Config")] }))
sharedContainer.setDefinition('Shared.Logger', createDefinition({object: WinstonLogger}))

sharedContainer.setDefinition('Shared.CommandHandlers', createDefinition({object: CommandHandlers, args:[getDefinitionByTag('commandHandler')] }), )
sharedContainer.setDefinition('Shared.CommandBus', createDefinition({object: InMemoryCommandBus, args: [sharedContainer.get("Shared.CommandHandlers")] }), )
sharedContainer.setDefinition('Shared.QueryHandlers', createDefinition({object: QueryHandlers, args: [getDefinitionByTag('queryHandler') ] }), )
sharedContainer.setDefinition('Shared.QueryBus', createDefinition({object: InMemoryQueryBus, args: [sharedContainer.get("Shared.QueryHandlers")] }), )
sharedContainer.setDefinition('Shared.JwtMiddleware', createDefinition({object: JwtMiddleware, args: [sharedContainer.get("Shared.JwtManager")] }), )
sharedContainer.setDefinition('Shared.Crypto', createDefinition({object: CryptoFactory }))
sharedContainer.setDefinition('Shared.RabbitMQConnection', createDefinition({object: RabbitMQConnection, args: [sharedContainer.get('Shared.RabbitMQConfig')] }))
sharedContainer.setDefinition('Shared.RabbitMQqueueFormatter', createDefinition({object: RabbitMQqueueFormatter, args: ["mooc"] }))
sharedContainer.setDefinition('Shared.RabbitMQConfigurer', createDefinition({object: RabbitMQConfigurer, args: [
  sharedContainer.get("Shared.RabbitMQConnection"), 
  sharedContainer.get("Shared.RabbitMQqueueFormatter")] 
}))
sharedContainer.setDefinition('Shared.DomainEventFailoverPublisher', createDefinition({object: DomainEventFailoverPublisher, args: [sharedContainer.get('Shared.ConnectionManager')]  }) )
sharedContainer.setDefinition('Shared.domain.EventBus', createDefinition({object: RabbitMQEventBusFactory, method: "create", args: [
  sharedContainer.get('Shared.DomainEventFailoverPublisher'),
  sharedContainer.get('Shared.RabbitMQConnection'),
  sharedContainer.get('Shared.RabbitMQqueueFormatter'),
  sharedContainer.get('Shared.RabbitMQConfig')
] }))

function createDefinition ({object, method, args = []} : {object: any, method?: string, args?: Array<any>}): Definition {
  let definition = new Definition(object, args)
  if(method) {
    definition.setFactory(object, method)
  }
  return definition
}

function getDefinitionByTag(taggs: string) {
  const definitions = [];
  const taggedServices = sharedContainer.findTaggedServiceIds(taggs)
  for (let [ definition] of taggedServices) {
    definitions.push(sharedContainer.get(definition))
  }
  return definitions;
}



export default sharedContainer;