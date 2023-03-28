import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { keycloakInstance, keycloakService } from "../security/keycloakService";

const HomePage = () => {
  // const { keycloak, initialized } = useKeycloak();

  // const handleLogout = () => {
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("refresh_token");
  //   localStorage.removeItem("roles");
  //   keycloak.logout();
  // };
  // useEffect(() => {
  //   console.log("hook value", keycloak);
  // }, [keycloak]);
  console.log("in home auth value is", keycloakInstance.authenticated);
  return (
    <>
      <h1>home page</h1>
      {/* {keycloak.authenticated && <p>yessssssss</p>}
      {/* <button onClick={() => keycloak.login()}>login</button> */}
      {keycloakInstance.authenticated && (
        <button onClick={keycloakService.logout}>logout</button>
      )}
    </>
  );
};
export default HomePage;
