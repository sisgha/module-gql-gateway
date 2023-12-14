import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig, IConfigFederationSubgraphSetup } from '../../domain';

@Injectable()
export class EnvironmentConfigService implements IConfig {
  constructor(
    // ...
    private configService: ConfigService,
  ) {}

  getFederationSubgraphModuleAutorizacaoSetup(): IConfigFederationSubgraphSetup | null {
    const url = this.configService.get('SISGEA_SUBGRAPH_AUTORIZACAO_URL') ?? null;

    if (url !== null) {
      return {
        name: 'autorizacao',
        url,
      };
    }

    return null;
  }

  getFederationSubgraphModuleBuscaSetup(): IConfigFederationSubgraphSetup | null {
    const url = this.configService.get('SISGEA_SUBGRAPH_BUSCA_URL') ?? null;

    if (url !== null) {
      return {
        name: 'busca',
        url,
      };
    }

    return null;
  }

  getFederationSubgraphs(): IConfigFederationSubgraphSetup[] {
    const moduleAutorizacaoSetup = this.getFederationSubgraphModuleAutorizacaoSetup();
    const moduleBuscaSetup = this.getFederationSubgraphModuleBuscaSetup();

    return [
      //
      moduleBuscaSetup,
      moduleAutorizacaoSetup,
    ].filter((i) => i !== null);
  }
}
