export const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export const KEYCLOAK_API = import.meta.env.VITE_KEYCLOAK_API;

export const KEYCLOAK_CLIENT = import.meta.env.VITE_KEYCLOAK_CLIENT;

export const FOLDER_BUCKET: { [key: string]: string } = {
  BASE_SITES: 'Base de données des sites',
  OPEX_OCI: 'Opex sites OCI',
  CA_SITES: "Chiffre d'affaire des sites",
  PARC_SITES: 'Parc par site',
  OPEX_ESCO: 'Opex sites ESCO',
  OPEX_IHS: 'Opex sites IHS',
  ACTION_COM: 'Actions Commerciales',
  ACTION_TECH: 'Actions techniques',
  CONGESTION: 'Congestion',
  ANNEXE_OPEX_ESCO: 'Annexe opex sites esco',
};
