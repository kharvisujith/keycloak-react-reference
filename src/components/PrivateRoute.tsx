import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }: any) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;
  // console.log("islogedin is", true);
  // console.log(keycloak.token);
  // console.log(keycloak.refreshToken);

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
