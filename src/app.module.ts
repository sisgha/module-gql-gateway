import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IConfig } from './domain';
import { EnvironmentConfigModule } from './infrastructure/environment-config/environment-config.module';
import { EnvironmentConfigService } from './infrastructure/environment-config/environment-config.service';

@Module({
  imports: [
    ConfigModule,
    EnvironmentConfigModule,

    //

    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,

      imports: [
        //
        EnvironmentConfigModule,
      ],

      inject: [EnvironmentConfigService],

      useFactory(configService: IConfig) {
        return {
          server: {
            // ... Apollo server options
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: configService.getFederationSubgraphs(),
            }),
          },
        };
      },
    }),
  ],
  controllers: [
    //
    AppController,
  ],
  providers: [
    //
    AppService,
  ],
})
export class AppModule {}
