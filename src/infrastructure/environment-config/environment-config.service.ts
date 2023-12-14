import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig, IConfigFederationSubgraphSetup } from '../../domain';

@Injectable()
export class EnvironmentConfigService implements IConfig {
  constructor(
    // ...
    private configService: ConfigService,
  ) {}

  getFederationSubgraphModuleAutenticacaoSetup(): IConfigFederationSubgraphSetup | null {
    const url = this.configService.get('SISGEA_SUBGRAPH_AUTENTICACAO_URL') ?? null;

    if (url !== null) {
      return {
        name: 'autenticacao',
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
    const moduleAutenticacao = this.getFederationSubgraphModuleAutenticacaoSetup();
    const moduleBusca = this.getFederationSubgraphModuleBuscaSetup();

    return [
      //
      moduleBusca,
      moduleAutenticacao,
    ].filter((i) => i !== null);
  }
}
