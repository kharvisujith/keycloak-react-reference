import { keycloakInstance } from "../security/keycloakService";

const SecuredPage = () => {
  console.log(keycloakInstance.token, "kdjfklsdjffff");
  return <h1>Secureddd pagee</h1>;
};
export default SecuredPage;
