export interface IConfigFederationSubgraphSetup {
  name: string;
  url: string;
}

export interface IConfigFederationSubgraphs {
  getFederationSubgraphModuleAutorizacaoSetup(): null | IConfigFederationSubgraphSetup;

  getFederationSubgraphModuleBuscaSetup(): null | IConfigFederationSubgraphSetup;

  getFederationSubgraphs(): IConfigFederationSubgraphSetup[];
}
