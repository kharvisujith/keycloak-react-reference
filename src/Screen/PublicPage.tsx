import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { keycloakInstance, keycloakService } from "../security/keycloakService";

const PublicPage = () => {
  useEffect(() => {
    console.log("Value of auth is", keycloakInstance.authenticated);
  }, []);
  console.log("value of auth isssssss", keycloakInstance.authenticated);
  return (
    <>
      <h1>public page</h1>
      {!keycloakInstance.authenticated && (
        <button onClick={keycloakService.login}>login</button>
      )}
      {/* <button onClick={keycloakService.logout}>loguttt</button> */}
    </>
  );
};
export default PublicPage;
