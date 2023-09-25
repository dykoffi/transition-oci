import Keycloak from "keycloak-js";
import axios from "axios"


export const keycloak = new Keycloak({
 url: import.meta.env.VITE_KEYCLOAK_URL_AUTH,
 realm: import.meta.env.VITE_KEYCLOAK_REALM,
 clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});


export const apiClient = axios.create(
    {
        baseURL: import.meta.env.VITE_BASE_URL_API,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }
)