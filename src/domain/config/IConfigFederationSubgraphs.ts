export interface IConfigFederationSubgraphSetup {
  name: string;
  url: string;
}

export interface IConfigFederationSubgraphs {
  getFederationSubgraphModuleAutenticacaoSetup(): null | IConfigFederationSubgraphSetup;

  getFederationSubgraphModuleBuscaSetup(): null | IConfigFederationSubgraphSetup;

  getFederationSubgraphs(): IConfigFederationSubgraphSetup[];
}
