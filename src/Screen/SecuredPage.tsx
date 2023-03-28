import { keycloakInstance, keycloakService } from "../security/keycloakService";

const SecuredPage = () => {
  console.log(keycloakInstance.token, "kdjfklsdjffff");
  return (
    <>
      <h1>Secureddd pagee</h1>
      {keycloakInstance.authenticated && (
        <button onClick={keycloakService.logout}>logout</button>
      )}
    </>
  );
};
export default SecuredPage;
