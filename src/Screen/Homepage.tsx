import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const HomePage = () => {
  const { keycloak, initialized } = useKeycloak();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles");
    keycloak.logout();
  };
  useEffect(() => {
    console.log("hook value", keycloak);
  }, [keycloak]);
  return (
    <>
      <h1>home page</h1>
      {keycloak.authenticated && <p>yessssssss</p>}
      {/* <button onClick={() => keycloak.login()}>login</button> */}
      <button onClick={handleLogout}>logout</button>
    </>
  );
};
export default HomePage;
