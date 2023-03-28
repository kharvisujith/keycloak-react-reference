// import Keycloak from "keycloak-js";
// import { useEffect, useState } from "react";
// import RoutesPage from "./components/RoutesPage";
// import jwt_decode from "jwt-decode";
// import jwtDecode from "jwt-decode";
// import HomePage from "./Screen/Homepage";
// import { Route, Routes } from "react-router-dom";
// import SecuredPage from "./Screen/SecuredPage";
// import { keycloakInstance, keycloakService } from "./security/keycloakService";
// import PublicPage from "./Screen/PublicPage";

// const App = () => {
//   // const [authenticated, setAuthenticated] = useState<boolean>(false);

//   const decodeToken = (token: any) => {
//     const decoded = jwtDecode(token);
//     console.log(decoded);
//     return decoded;
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       console.log("inside if token");
//       console.log(keycloakService.userRoles());

//       const decodedToken: any = decodeToken(token);

//       if (decodedToken.exp > Date.now() / 1000) {
//         //  setAuthenticated(true);
//         keycloakInstance.token = token;
//         keycloakInstance.refreshToken =
//           localStorage.getItem("refreshToken") || "";
//       } else {
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         const kk = keycloakService.authenticate();
//         console.log(kk);
//       }
//     } else {
//       console.log("inside else in app useEffect");
//       //authenticate();
//       const kk = keycloakService.authenticate();
//       console.log(kk);
//     }
//   }, []);

//   // function authenticate() {
//   //   keycloakService.authenticate();
//   // }
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<PublicPage />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/secured" element={<SecuredPage />} />
//       </Routes>
//       {/* <HomePage /> */}
//       {/* <RoutesPage /> */}
//     </>
//   );
// };
// export default App;

import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import { keycloakInstance, keycloakService } from "./security/keycloakService";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Screen/Homepage";
import SecuredPage from "./Screen/SecuredPage";
import PublicPage from "./Screen/PublicPage";

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  //const [authenticated, setAuthenticated] = useState<any>();

  useEffect(() => {
    if (!keycloakInitialized) {
      const autheticate = async () => {
        const isAuthenticated = await keycloakService.authenticate();
        console.log("isauthe is", isAuthenticated);
        if (isAuthenticated) {
          // setAuthenticated(true);
          setKeycloakInitialized(true);
        }
      };
      autheticate();
    }
  }, [keycloakInitialized]);
  console.log(
    "value of keycloakinstance.authenticated is",
    keycloakInstance.authenticated
  );

  console.log("keycloak is", keycloakInstance.realmAccess?.roles);

  return (
    <>
      {keycloakInstance.authenticated &&
      keycloakService.userRoles() === "interviewer" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/secured" element={<SecuredPage />} />
          <Route path="/login" element={<PublicPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<PublicPage />} />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/login" element={<PublicPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
