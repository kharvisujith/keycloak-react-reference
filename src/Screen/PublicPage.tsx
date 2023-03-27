import { useKeycloak } from "@react-keycloak/web";

const PublicPage = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <>
      <h1>public page</h1>
      <button
        onClick={() =>
          keycloak.login().then((auth) => console.log("authhh", auth))
        }
      >
        login
      </button>
    </>
  );
};
export default PublicPage;
