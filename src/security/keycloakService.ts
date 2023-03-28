import Keycloak from "keycloak-js";

export const keycloakInstance = new Keycloak();

const authenticate = async () => {
  try {
    const res = await keycloakInstance.init({ onLoad: "check-sso" });
    console.log("res is", res);
    if (res) {
      localStorage.setItem("token", keycloakInstance.token!);
      localStorage.setItem("refreshToken", keycloakInstance.refreshToken!);
      return true;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return false;
    }
  } catch (error: any) {
    console.log(error);
  }
};

const login = () => {
  console.log("login method called");
  //   keycloakInstance.login();
  const token = localStorage.getItem("myapp_token");
  if (token) {
    if (keycloakInstance.isTokenExpired(parseInt(token))) {
      console.log("insidee iffff toenn expreddd");
      keycloakInstance
        .login()
        .then((authenticated: any) => {
          if (authenticated) {
            localStorage.setItem("token", keycloakInstance.token!);
            localStorage.setItem(
              "refresh-token",
              keycloakInstance.refreshToken!
            );
            console.log(
              "keycloak isntalce autttth is",
              keycloakInstance.authenticated
            );
            // setAuthenticated(true);
          } else {
            console.log("Login failed");
          }
        })
        .catch((error) => {
          console.log("Keycloak login error:", error);
        });
    }
  } else {
    console.log("else of token");
    keycloakInstance
      .login()
      .then((authenticated: any) => {
        if (authenticated) {
          const token = keycloakInstance.token;
          localStorage.setItem("myapp_token", token!);
        } else {
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.log("Keycloak login error:", error);
      });
  }
};

const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("refreshToken");
  keycloakInstance.logout();
};

const userRoles = () => {
  console.log("user roles caleedd");
  console.log(keycloakInstance);
  if (keycloakInstance.realmAccess === undefined) return undefined;
  const roles = keycloakInstance.realmAccess?.roles;
  if (roles.includes("interviewer")) {
    return "interviewer";
  }
  return "";
};

const isAutheticated = () => {
  return keycloakInstance.authenticated;
};

export const keycloakService = {
  authenticate: authenticate,
  login: login,
  logout: logout,
  userRoles: userRoles,
  isAutheticated: isAutheticated,
};
