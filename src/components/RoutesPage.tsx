import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Screen/Homepage";
import PublicPage from "../Screen/PublicPage";
import SecuredPage from "../Screen/SecuredPage";

const RoutesPage = () => {
  const { keycloak, initialized } = useKeycloak();
  const [role, setRole] = useState<any>();

  console.log("keycloak value in route is", keycloak);
  console.log();

  const getRole = () => {
    const roles = keycloak.realmAccess?.roles;
    if (roles?.includes("interviewer")) {
      setRole("interviewer");
      return "interviewer";
    }
    return "";
  };

  useEffect(() => {
    console.log("useffect in route");
    console.log(getRole());
  }, [keycloak.realmAccess]);

  // useEffect(() => {
  //   console.log("useEffe in routes");
  //   const roles = keycloak?.realmAccess?.roles || [];
  //   console.log("role is", roles);
  //   localStorage.setItem("roles", roles.toString());

  //   const accessToken = keycloak?.token;
  //   const refreshToken = keycloak?.refreshToken;
  //   console.log("keeek", accessToken, refreshToken);

  //   if (accessToken && refreshToken) {
  //     localStorage.setItem("acces-token", accessToken);
  //     localStorage.setItem("refresh-token", refreshToken);
  //   }
  // }, [keycloak]);

  if (!initialized) {
    return <p>..lodingggggggggg</p>;
  }

  console.log("value of role is", role);
  return (
    <>
      {keycloak.authenticated && role === "interviewer" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/secured" element={<SecuredPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<PublicPage />} />
        </Routes>
      )}
    </>
  );
};

export default RoutesPage;
