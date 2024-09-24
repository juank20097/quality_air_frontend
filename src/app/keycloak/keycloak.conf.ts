import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8081',
  realm: 'devops',
  clientId: 'base'
};

export default keycloakConfig;
