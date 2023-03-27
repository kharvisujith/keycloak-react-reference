import { NavLink } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Nav = () => {
  // const { keycloak, initialized } = useKeycloak();
  const { keycloak, initialized } = useKeycloak();
  return (
    <>
      <h1>Nav component</h1>
      <NavLink to={"/"}>
        <button
        // onClick={() => {
        //   navigate("/");
        // }}
        >
          home
        </button>
      </NavLink>
      <NavLink to="/secured">
        <button
        // onClick={() => {
        //   navigate("/secured");
        // }}
        >
          Secured Page
        </button>
      </NavLink>
      {keycloak?.authenticated && (
        <button onClick={() => keycloak.logout()}>Logout</button>
      )}
      {!keycloak?.authenticated && (
        <button
          onClick={() =>
            keycloak.login().then(() => {
              console.log("token is", keycloak.token);
              localStorage.setItem("keeek", keycloak.token!);
            })
          }
        >
          Login
        </button>
      )}
    </>
  );
};

export default Nav;
