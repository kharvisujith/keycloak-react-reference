// import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import Nav from "./components/Nav";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import keycloak from "keycloak-js";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RoutesPage from "./components/RoutesPage";
import HomePage from "./Screen/Homepage";

// import HomePage from "./Screen/Homepage";
// import SecuredPage from "./Screen/SecuredPage";
// // import keycloak from "./components/KeyCloak";
// import { Routes, Route } from "react-router-dom";

// import PrivateRoute from "./components/PrivateRoute";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import Keycloak from "keycloak-js";
// // import Keycloak from "keycloak-js";

// // keycloak.init({
// //   onLoad: "login-required",
// // });
// // keycloak.init({ onLoad: "check-sso" }).then((authenticated) => {
// // //   console.log(`User ${authenticated ? "is" : "is not"} authenticated`);
// // // });
// // const keycloak = new Keycloak({
// //   url: "http://localhost:8080/",
// //   realm: "demo",
// //   clientId: "rms-client",
// // });

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   useEffect(() => {
//     console.log("useEffect of app is called");
//     console.log(
//       "keylcloak value is",
//       keycloak,
//       keycloak.authenticated,
//       keycloak.token
//     );

//     // console.log(typeof keycloak);
//     // console.log(keycloak.token);
//     // console.log(keycloak.authenticated);
//     // if (keycloak.authenticated) {
//     //   setIsAuthenticated(keycloak.authenticated);
//     // }
//   }, []);
//   console.log("auth value is", isAuthenticated);

//   // useEffect(() => {
//   //   keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
//   //     console.log("autheticate value in useeffect is", authenticated);
//   //     setIsAuthenticated(authenticated);
//   //   });
//   // }, [keycloak, setIsAuthenticated]);
//   return (
//     <>
//       <ReactKeycloakProvider
//         //  initOptions={{ onload: "login-required" }}
//         authClient={keycloak}
//       >
//         <Nav />

//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/secured" element={<SecuredPage />} />
//         </Routes>
//         {/* {isAuthenticated && (
//     <>
//       <Routes>

//       </Routes>
//     </>
//   )}

//   {!isAuthenticated && (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//     </Routes>
//   )} */}
//       </ReactKeycloakProvider>
//     </>
//   );
// };

// export default App;

// // import React, { useEffect, useState } from "react";
// // import Keycloak from "keycloak-js";
// // import { ReactKeycloakProvider } from "@react-keycloak/web";
// // import { Routes, Route } from "react-router-dom";
// // import Nav from "./components/Nav";
// // import HomePage from "./Screen/Homepage";
// // import SecuredPage from "./Screen/SecuredPage";

// // const MyComponent = () => {
// //   const [keycloak, setKeycloak] = useState<any>();
// //   useEffect(() => {
// //     const initKeycloak = async () => {
// //       const keycloak = new Keycloak({
// //         url: "http://localhost:8080",
// //         realm: "demo",
// //         clientId: "rms-client",
// //       });
// //       await keycloak.init({
// //         onLoad: "login-required",
// //         checkLoginIframe: false,
// //       });
// //       setKeycloak(keycloak);
// //     };
// //     if (!keycloak) {
// //       initKeycloak();
// //     }
// //     // initKeycloak();
// //   }, [keycloak]);

// //   // useEffect(() => {
// //   //   const initKeycloak = async () => {
// //   //     const keycloak = new Keycloak({
// //   //       url: "http://localhost:8080",
// //   //       realm: "demo",
// //   //       clientId: "rms-client",
// //   //     });
// //   //     await keycloak.init({
// //   //       onLoad: "login-required",
// //   //       checkLoginIframe: false, // This is important for Keycloak version 20+
// //   //       //  redirectUri: "http://localhost:3000/secured",
// //   //     });
// //   //     if (keycloak.authenticated) setKeycloak(keycloak);
// //   //   };

// //   //   initKeycloak();
// //   // }, []);

// //   // if (!keycloak) {
// //   //   return <p>...lodingcomponent here</p>;
// //   // }

// //   return (
// //     <>
// //       <ReactKeycloakProvider authClient={keycloak}>
// //         <React.StrictMode>
// //           <Routes>
// //             <Route path="/" element={<HomePage />} />
// //             <Route path="/secured" element={<SecuredPage />} />
// //           </Routes>
// //         </React.StrictMode>
// //       </ReactKeycloakProvider>

// //       {/* <ReactKeycloakProvider authClient={keycloak}>
// //         <Nav />

// //         <Routes>
// //           <Route path="/" element={<HomePage />} />
// //           <Route path="/secured" element={<SecuredPage />} />
// //         </Routes>
// //       </ReactKeycloakProvider> */}
// //     </>
// //   );
// // };

// // export default MyComponent;
const keycloakInstance = new Keycloak();

const App = () => {
  const handleTokens = (tokens: any) => {
    console.log("token caleedd");
    if (tokens.token && tokens.refreshToken) {
      localStorage.setItem("access_token", tokens.token);
      localStorage.setItem("refresh_token", tokens.refreshToken);
      localStorage.setItem(
        "roles",
        JSON.stringify(keycloakInstance.realmAccess?.roles)
      );
    }
    console.log(keycloakInstance.realmAccess?.roles);

    // localStorage.setItem(
    //   "roles",
    //   JSON.stringify(keycloakInstance?.realmAccess.roles! || "")
    // );
  };

  useEffect(() => {
    console.log("useEffect in app");
    console.log("keyckl is", keycloakInstance);
  }, []);

  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloakInstance}
        initOptions={{ onLoad: "check-sso", checkLoginIframe: true }}
        onTokens={handleTokens}
        //  isLoadingCheck={false}
        // isLoadingCheck={false} // disable automatic token check
      >
        <RoutesPage />
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes> */}
      </ReactKeycloakProvider>
    </>
  );
};
export default App;
