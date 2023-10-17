namespace=motower-ihm

## Desinstaller la chart postgres
helm uninstall postgres --namespace $namespace

## Desinstaller la chart keycloak
helm uninstall keycloak --namespace $namespace