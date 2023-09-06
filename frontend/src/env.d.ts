interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_KEYCLOAK_URL_AUTH: string
    readonly VITE_KEYCLOAK_REALM: string
    readonly VITE_KEYCLOAK_CLIENT: string
    readonly VITE_BASE_URL_API: string
    readonly VITE_KEYCLOAK_API: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}